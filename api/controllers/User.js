'use strict';

var User = require('../models/User.js');
var Follower = require('../models/Follower');
var HttpError = require('../utils/HttpError.js');
var HttpResponse = require('../utils/HttpResponse');

exports.findAll = (req, res) => {
	User.findAll( (error, data) => {
		if (error)
			HttpError.send(500, error.sqlMessage, res);
		else
			HttpResponse.send(data, res);
	});
};

exports.findById = (req, res) => {
	User.findById(req.params.id, (error, data) => {
		if (error)
			HttpError.send(500, error.sqlMessage, res);
		else
			HttpResponse.send(data, res);
	});
};

exports.findByUsername = (req, res) => {
	User.findByUsername(req.params.username, (error, data) => {
		if (error)
			HttpError.send(500, error.sqlMessage, res);
		else
			HttpRespnose.send(data, res);
	});
};

exports.deleteById = (req, res) => {
	User.deleteById(req.params.id, (error, data) => {
		if (error)
			HttpError.sendError(sqlMessage, res);
		else
			HttpResponse.send(data, res);
	});
};

exports.deleteAll = (req, res) => {
	User.deleteAll( (error, data) => {
		if (error)
			HttpError.sendError(sqlMessage, res);
		else
			HttpResponse.send(data, res);
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
		HttpError.send(400, 'Invalid body', res);
		return;
	}
	
	let username = req.body.username;
	let password = req.body.password;
	
	if (!username || !password) {
		HttpError.send(400, 'Username and password are required.', res);
		return;
	}

	// User input should either be a valid email or valid username
	if (!User.validUsername(username) && !User.validEmail(username)) {
		HttpError.send(400, 'Invalid credentials entered.', res);
		return;
	}
	
	if (!User.validPassword(password)) {
		HttpError.send(400, 'Invalid password format.', res);
		return;
	}

	User.findByUsernameOrEmail(username, (error, data) => {
		if (error) {
			HttpError.send(500, error.sqlMessage, res);
			return
		}
		
		if (data.length === 0) {
			HttpError.send(500, 'User was not found.', res);
			return;
		}

		let user = data[0];
		
		User.matching(password, user.password, (matched) => {
			if (!matched) {
				HttpError.send(401, 'The username or password is invalid.', res);
				return;
			}
			let lastLogin = new Date();
			user.lastLogin = lastLogin;
			HttpResponse.send(user, res);
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
		HttpError.send(400, 'Invalid User', res);
		return;
	}

	if (!User.validUsername(newUser.username)) {
		HttpError.send(400, 'Valid username is required.', res);
		return;
	}

	if (!newUser.firstName || newUser.firstName.length <= 1 || !newUser.lastName || newUser.lastName.length <= 1) {
		HttpError.send(400, 'Valid first and last names are required.', res);
		return;
	}

	if (!User.validEmail(newUser.email)) {
		HttpError.send(400, 'Valid email is required.', res);
		return;
	}

	if (!User.validPassword(newUser.password)) {
		HttpError.send(400, 'Password must be 6 characters minimum and contain 1 lowercase, 1 uppercase and 1 number', res);
		return;
	}
	
	if (typeof newUser.dateOfBirth === "string" && newUser.dateOfBirth.length == 0) {
		newUser.dateOfBirth = null;
	}

	// Hash Password
	newUser.password = User.encrypted(newUser.password);

	User.create(newUser, (error, data) => {
		if (error) {
			res.send(500, error.sqlMessage, res);
			return;
		}

		console.log(`New user created: ${JSON.stringify(newUser)}`);
		HttpResponse.send(data, res);
	});
};

/**
 * Controller Update
 */

exports.updatePreferredName = (req, res) => {
	const id = req.params.id;
	const preferredName = decodeURI(req.params.name);
	User.updatePreferredName(id, preferredName, (error, data) => {
		if (error) {
			HttpError.send(500, 'Unable to update your preferred name at this time, please try again at a later time.', res);
			return;
		}
		HttpResponse.send(data, res);
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
		HttpError.send(400, 'Invalid entry.');
		return;
	}
	
	var id = req.params.id;
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	
	// confirm oldPassword and newPasswords were received.
	if (typeof oldPassword === undefined || typeof newPassword === undefined) {
		HttpError.send(400, 'OldPassword and NewPassword are required fields.', res);
		return;
	}
	
	// confirm password formats are correct.
	if (!User.validPassword(oldPassword) || !User.validPassword(newPassword)) {
		HttpError.send(400, 'OldPassword and NewPassword must be valid.', res);
		return;
	};
	
	// cannot send matching passwords.
	if (oldPassword === newPassword) {
		HttpError.send(400, 'OldPassword and NewPassword fields cannot be the same', res);
		return;
	}
	
	User.findById(id, (error, data) => {
		if (error) {
			HttpError.send(500, 'Unable to update password at this time. Please try again at a later time.', res);
			return;
		}
		
		if (data.count === 0) {
			HttpError.send(400, 'User not found.', res);
			return;
		}
		
		let user = data[0];
		
		User.matching(oldPassword, user.password, (matched) => {
			if (!matched) {
				HttpError.send(403, 'Invalid password entered.', res);
				return;	
			}
			
			var newPasswordHashed = User.encrypted(newPassword);
			User.updatePasswordForUserWithId(id, newPasswordHashed, (err, dat) => {
				if (err) {
					HttpError.send(500, 'Unable to update password at this time. Please try again at a later time.', res);
					return;
				}
				HttpResponse.send(dat, res);
			});
		});
	});
};

/**
 * Creates a new `followers` record in mysql database.
 * @param {object} req.params: { "followerId": {number}, "userId": {number} }
 * @api public
 */
exports.follow = (req, res) => {
	if (isNaN(req.params.followerId) || isNaN(req.params.userId)) {
		HttpError.send(400, 'Invalid request.', res);
		return;
	}
	
	var followerId = parseInt(req.params.followerId);
	var userId = parseInt(req.params.userId);
	
	Follower.create(userId, followerId, (error, data) => {
		if (error)
			HttpError.sendError(error, res);
		else
			HttpResponse.send(data, res);
	});
}

/**
 * Deletes a `followers` record in mysql database.
 * @param {object} req.params: { "followerId": {number}, "userId": {number} }
 * @api public
 */
exports.unfollow = (req, res) => {
	if (isNaN(req.params.followerId) || isNaN(req.params.userId)) {
		HttpError.send(400, 'Invalid request.', res);
		return;
	}
	
	var followerId = parseInt(req.params.followerId);
	var userId = parseInt(req.params.userId);
	
	Follower.delete(userId, followerId, (error, data) => {
		if (error)
			HttpError.sendError(error, res);
		else
			HttpResponse.send(data, res);
	});
};

exports.findFollowersByFollowerId = (req, res) => {
	if (isNaN(req.params.followerId)) {
		HttpError.send(400, 'Invalid request.', res);
		return;
	}
	
	var followerId = parseInt(req.params.followerId);
	
	Follower.findByFollowerId(followerId, (error, data) => {
		if (error)
			HttpError.sendError(error, res);
		else
			HttpResponse.send(data, res);
	});
};

exports.findFollowersByUserId = (req, res) => {
	if (isNaN(req.params.userId)) {
		HttpError.send(400, 'Invalid request.', res);
		return;
	}
	
	var userId = parseInt(req.params.userId);
	
	Follower.findByUserId(userId, (error, data) => {
		if (error)
			HttpError.sendError(error, res);
		else
			HttpResponse.send(data, res);
	});
};