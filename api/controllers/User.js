'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

var User = require('../models/User.js');

exports.getAll = (req, res) => {
	User.getAll( (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	});
};

exports.getById = (req, res) => {
	User.getById(req.params.id, (error, data) => {
		if (error)
			res.send(error);
		else
			res.send(data);
	});
};

exports.getByUsername = (req, res) => {
	User.getByUsername(req.params.username, (error, data) => {
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

exports.login = (req, res) => {
	var LoginModel = function (model) {
		this.input = model.input;
		this.password = model.password;
	};

	const loginCredentials = new LoginModel(req.body);

	if (!loginCredentials) {
		res.status(400).send({
			error: 'Invalid User'
		});
		return;
	}

	// User input should either be a valid email or valid username
	if (!validUsername(loginCredentials.input) && !validEmail(loginCredentials.input)) {
		res.status(400).send({
			error: 'Invalid credentials entered.'
		});
		return;
	}

	User.getByUsernameOrEmail(loginCredentials.input, (error, data) => {
		if (error) {
			res.status(500).send({
				error: error.sqlMessage
			});
			return
		}
		
		if (data.length === 0) {
			res.status(400).send({
				error: 'User was not found.'
			});
			return;
		}

		let user = data[0];
		let userHashedPassword = user.password;
		if (!matching(loginCredentials.password, userHashedPassword)) {
			res.status(401).send({
				error: 'Authentication failed.'
			});
			return;
		}

		let lastLogin = new Date();
		user.lastLogin = lastLogin;
		res.status(200).send({
			user: user,
			message: 'Login success.'
		});
		User.updateLastLogin(user.id, lastLogin, (error, data) => {});
	});
};

exports.create = (req, res) => {
	var newUser = new User(req.body);
	delete newUser.id;
	newUser.createdDate = new Date();

	// Validate user
	if (!newUser) {
		res.status(400).send({
			error: 'Invalid User'
		});
		return;
	}

	if (!validUsername(newUser.username)) {
		res.status(400).send({
			error: 'Valid username is required.'
		});
		return;
	}

	if (!newUser.firstName || newUser.firstName.length <= 1 || !newUser.lastName || newUser.lastName.length <= 1) {
		res.status(400).send({
			error: 'Valid first and last names are required.'
		});
		return;
	}

	if (!validEmail(newUser.email)) {
		res.status(400).send({
			error: 'Valid email is required.'
		});
		return;
	}

	if (!validPassword(newUser.password)) {
		res.status(400).send({
			error: 'Password must be 6 characters minimum and contain 1 lowercase, 1 uppercase and 1 number'
		});
		return;
	}

	// Hash Password
	newUser.password = encrypted(newUser.password);

	User.create(newUser, (error, data) => {
		if (error) {
			res.status(500).send({
				error: error.sqlMessage
			});
			return;
		}

		console.log(`New user created: ${JSON.stringify(newUser)}`);
		res.status(200).send(data);
	});
};

exports.updatePreferredName = (req, res) => {
	const id = req.params.id;
	const preferredName = decodeURI(req.params.name);
	console.log(req.params.name, preferredName);
	User.updatePreferredName(id, preferredName, (error, data) => {
		if (error) {
			res.status(500).send({
				error: error.sqlMessage
			});
			return;
		}
		
		console.log(`PreferredName updated: ${preferredName}`);
		res.send(data);
	});
};

// MARK: - Utils
function matching(password, hash) {
	return bcrypt.compareSync(password, hash);
}

function encrypted(password) {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(password, salt);
}

function validUsername(username) {
	return validString(username,
		"^" +
		"(?=.*[a-zA-Z\_])" + // only letters and dashes allowed
		"(?=.{2,})" // 2 characters or longer
	);
}

function validPassword(password) {
	return validString(password, 
		"^" +
		"(?=.*[a-z])" + // 1 lowercase letter
		"(?=.*[A-Z])" + // 1 uppercase letter
		"(?=.*[0-9])" + // 1 numeric
		// "(?=.*[!@#$%^&*])" + // 1 special character from list
		"(?=.{6,})" // 6 characters or longer
	);
}

function validEmail(email) {
	return validString(email,
		"^" +
		"(?=.*[@])" + // all emails contains "." and "@" characters
		"(?=.{3,})" // email should be at least 3 characters long
	);
}

function validString(str, regex) {
	var regex = new RegExp(regex);
	return typeof str === "string" & regex.test(str); 
}