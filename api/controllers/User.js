'use strict';

/**
 * Module dependencies.
 * @private
 */
var User = require('../models/User.js');
var createError = require('http-errors');
var utils = require('../Utils');

/**
 * Module functions.
 * @public
 */
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

	if (typeof loginCredentials !== 'object' || !loginCredentials.input || !loginCredentials.password) {
		throw new TypeError('Invalid login credentials entered');
		return;
	}

	// User input should either be a valid email or valid username
	if (!utils.isUsername(loginCredentials.input) && !utils.isEmail(loginCredentials.input)) {
		res.status(400).send({
			status: 400,
			message: 'Invalid credentials entered.'
		});
		return;
	}

	User.getByUsernameOrEmail(loginCredentials.input, (error, data) => {
		if (error) {
			res.status(500).send({
				status: 500,
				message: error.sqlMessage
			});
			return
		}
		
		if (data.length === 0) {
			res.status(400).send({
				status: 400,
				message: 'User was not found.'
			});
			return;
		}
		
		var user = data[0];
		var userHashedPassword = user.password;
		if (!utils.matching(loginCredentials.password, userHashedPassword)) {
			res.status(401).send({
				status: 401,
				message: 'Login credentials do not match.'
			});
			return;
		}
		
		var lastLogin = new Date();
		user.lastLogin = lastLogin;
		res.status(200).send({
			status: 200,
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
			status: 400,
			message: 'Invalid user.'
		});
		return;
	}

	if (!utils.isUsername(newUser.username)) {
		res.status(400).send({
			status: 400,
			message: 'Valid username is required.'
		});
		return;
	}

	if (!newUser.firstName || newUser.firstName.length <= 1 || !newUser.lastName || newUser.lastName.length <= 1) {
		res.status(400).send({
			status: 400,
			message: 'Valid first and last names are required.'
		});
		return;
	}

	if (!utils.isEmail(newUser.email)) {
		res.status(400).send({
			status: 400,
			message: 'Valid email is required.'
		});
		return;
	}

	if (!utils.isPassword(newUser.password)) {
		res.status(400).send({
			status: 400,
			message: 'Password must be 6 characters minimum and contain 1 lowercase, 1 uppercase and 1 number.'
		});
		return;
	}

	// Hash Password
	newUser.password = utils.encrypted(newUser.password);

	User.create(newUser, (error, data) => {
		if (error) {
			res.status(500).send({
				status: 500,
				message: error.sqlMessage
			});
			return;
		}

		console.log(`New user created: ${JSON.stringify(newUser)}`);
		res.status(200).send(data);
	});
};

exports.updatePreferredName = (req, res) => {
	var id = req.params.id;
	var preferredName = decodeURI(req.params.name);
	console.log(req.params.name, preferredName);
	User.updatePreferredName(id, preferredName, (error, data) => {
		if (error) {
			res.status(500).send({
				status: 500,
				message: error.sqlMessage
			});
			return;
		}
		
		console.log(`PreferredName updated: ${preferredName}`);
		res.send(data);
	});
};

exports.updateDateOfBirth = (req, res) => {
	var id = req.params.id;
	var dob = req.params.dob;
	User.updateDateOfBirth(id, dob, (error, data) => {
		if (error) {
			res.status(500).send({
				status: 500,
				message: error.sqlMessage
			});
			return;
		}
		console.log(`DateOfBirth updated: ${dob}`);
		res.send(data);
	});
};