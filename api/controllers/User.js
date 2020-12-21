'use strict';

var User = require('../models/User.js');

exports.findAll = (req, res) => {
	User.findAll( (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	});
};

exports.findById = (req, res) => {
	User.findById(req.params.id, (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	});
};

exports.findByUsername = (req, res) => {
	User.findByUsername(req.params.username, (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	});
};

exports.deleteById = (req, res) => {
	User.deleteById(req.params.id, (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	});
};

exports.deleteAll = (req, res) => {
	User.deleteAll( (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	});
};

/**
 * @reqParams {object} {
 * 	"id": {int}
 * }
 * @reqBody {object} {
 *	"username": {string},
 * 	"password": {string}
 * }
 * @api public
 */
exports.login = (req, res) => {
	
	if (!req.body) {
		res.status(400).send('Invalid body');
		return;
	}
	
	let username = req.body.username;
	let password = req.body.password;
	
	if (!username || !password) {
		res.status(400).send('Username and password are required.');
		return;
	}

	// User input should either be a valid email or valid username
	if (!User.validUsername(username) && !User.validEmail(username)) {
		res.status(400).send('Invalid credentials entered.');
		return;
	}
	
	if (!User.validPassword(password)) {
		res.status(400).send('Invalid password format.');
		return;
	}

	User.findByUsernameOrEmail(username, (error, data) => {
		if (error) {
			res.status(500).send(error.sqlMessage);
			return
		}
		
		if (data.length === 0) {
			res.status(400).send('User was not found.');
			return;
		}

		let user = data[0];
		
		User.matching(password, user.password, (matched) => {
			if (!matched) {
				res.status(401).send('The username or password is invalid.');
				return;
			}
			let lastLogin = new Date();
			user.lastLogin = lastLogin;
			res.status(200).send({
				user: user,
				message: 'OK'
			});
			User.updateLastLogin(user.id, lastLogin, (error, data) => {});
		});
	});
};

exports.create = (req, res) => {
	var newUser = new User(req.body);
	delete newUser.id;
	newUser.createdDate = new Date();

	// Validate user
	if (!newUser) {
		res.status(400).send('Invalid User');
		return;
	}

	if (!User.validUsername(newUser.username)) {
		res.status(400).send('Valid username is required.');
		return;
	}

	if (!newUser.firstName || newUser.firstName.length <= 1 || !newUser.lastName || newUser.lastName.length <= 1) {
		res.status(400).send('Valid first and last names are required.');
		return;
	}

	if (!User.validEmail(newUser.email)) {
		res.status(400).send('Valid email is required.');
		return;
	}

	if (!User.validPassword(newUser.password)) {
		res.status(400).send('Password must be 6 characters minimum and contain 1 lowercase, 1 uppercase and 1 number');
		return;
	}
	
	if (typeof newUser.dateOfBirth === "string" && newUser.dateOfBirth.length == 0) {
		newUser.dateOfBirth = null;
	}

	// Hash Password
	newUser.password = User.encrypted(newUser.password);

	User.create(newUser, (error, data) => {
		if (error) {
			res.status(500).send(error.sqlMessage);
			return;
		}

		console.log(`New user created: ${JSON.stringify(newUser)}`);
		res.status(200).send(data);
	});
};

/**
 * Controller Update
 */

exports.updatePreferredName = (req, res) => {
	const id = req.params.id;
	const preferredName = decodeURI(req.params.name);
	console.log(req.params.name, preferredName);
	User.updatePreferredName(id, preferredName, (error, data) => {
		if (error) {
			res.sendStatus(500);
			return;
		}
		
		console.log(`PreferredName updated: ${preferredName}`);
		res.send(data);
	});
};

/**
 * Updates password for user with given id.
 * @reqParams {object} {
 * 		"id": {number}
 * }
 * @reqBody {object} {
 * 	"oldPassword": {string},
 *	"newPassword": {string}
 * }
 * @api public
 */
exports.updatePasswordForUserWithId = (req, res) => {
	if (!req.body || !req.params) {
		res.sendStatus(400);
		return;
	}
	
	var id = req.params.id;
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	
	// confirm oldPassword and newPasswords were received.
	if (typeof oldPassword === undefined || typeof newPassword === undefined) {
		res.sendStatus(400);
		return;
	}
	
	// confirm password formats are correct.
	if (!User.validPassword(oldPassword) || !User.validPassword(newPassword)) {
		res.sendStatus(400);
		return;
	};
	
	// cannot send matching passwords.
	if (oldPassword === newPassword) {
		res.sendStatus(400);
		return;
	}
	
	User.findById(id, (error, data) => {
		if (error) {
			res.sendStatus(500);
			return;
		}
		
		if (data.count === 0) {
			res.sendStatus(400);
			return;
		}
		
		let user = data[0];
		
		User.matching(oldPassword, user.password, (matched) => {
			if (!matched) {
				res.sendStatus(403);
				return;	 
			}
			
			var newPasswordHashed = User.encrypted(newPassword);
			User.updatePasswordForUserWithId(id, newPasswordHashed, (err, dat) => {
				if (err) {
					res.sendStatus(500);
					return;
				}
				res.sendStatus(200);
			});
		});
	});
};