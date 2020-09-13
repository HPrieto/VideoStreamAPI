'use strict';

/**
 * Module dependencies.
 * @private
 */
var connection = require('../database/mysql');

/**
user table schema:

CREATE TABLE user(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(40) NOT NULL,
	password VARCHAR(50) NOT NULL,
	firstName VARCHAR(40) NOT NULL,
	lastName VARCHAR(40) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phoneNumber VARCHAR(20),
	dateOfBirth DATE,
	lastLogin DATETIME,
	createdDate DATETIME,
	PRIMARY KEY (id)
);

CREATE UNIQUE INDEX unique_username
ON user(username);

CREATE UNIQUE INDEX unique_email
ON user(email);
*/

/**
 * Module class
 * @public
 */

var User = function(model) {
	this.id 		 = model.id;
	this.username 	 = model.username;
	this.password 	 = model.password;
	this.email 		 = model.email;
	this.firstName 	 = model.firstName;
	this.lastName 	 = model.lastName;
	this.preferredName = model.preferredName;
	this.phoneNumber = model.phoneNumber;
	this.email 		 = model.email;
	this.dateOfBirth = model.dateOfBirth;
	this.createdDate = model.createdDate;
};

/**
 * Module methods.
 * @public
 */
 
 // return all records in 'user' table
User.getAll = (res) => {
	connection.query(
		"SELECT * FROM user ORDER BY id",
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		});
};

/**
 * Return record from 'user' table with matching 'id'
 *
 * @param {int} id
 * @param {function} res
 *
 * @return {function} 
 * @public
 */
User.getById = (id, res) => {
	
	if (isNaN(id)) {
		throw new TypeError(`Argument expected instance of integer, received instance of ${typeof id}.`);
	}
	
	connection.query(
		"SELECT * FROM user WHERE id = ? ORDER BY id",
		id,
		(error, data) => {
			if (error) {
				res(error, null);
			} else {
				res(null, data);
			}
		}
	);
};

/**
 * Returns record from 'user' table with matching 'username'
 *
 * @param {string} username
 * @param {function} res
 *
 * @public
 */
User.getByUsername = (username, res) => {
	
	if (typeof username !== 'string') {
		throw new TypeError(`Argument expected instance of string, received instance of ${typeof username}.`);
	}
	
	if (username.length === 0) {
		throw new Error('Argument must not be empty.');
	}
	
	connection.query(
		"SELECT * FROM user WHERE username = ? LIMIT 1",
		username,
		(error, data) => {
			if (error) {
				res(error, null);
			} else {
				res(null, data);
			}
		}
	);
};

/**
 * Returns record with matching username or email
 *
 * @param {string} input
 * @param {function} res
 * @public
 */
User.getByUsernameOrEmail = (input, res) => {
	
	if (typeof input !== 'string') {
		throw new TypeError(`Argument expected instance of string, received instance of ${typeof input}.`);
	}
	
	if (input.length === 0) {
		throw new Error('Argument must not be empty.');
	}
	
	connection.query(
		"SELECT * FROM user WHERE username = ? OR email = ? LIMIT 1",
		[input, input],
		(error, data) => {
			if (error) {
				res(error, null);
			} else {
				res(null, data);
			}
		}
	);
};

/**
 * Creates new record in 'user' table
 *
 * @param {object} user
 * @param {function} res
 * @public
 */
User.create = (user, res) => {
	
	if (typeof user !== 'object') {
		throw new TypeError(`Argument expected instance of object, received instance of ${typeof user}.`);
	}
	
	connection.query(
		"INSERT INTO user SET ?",
		user,
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

/**
 * Deletes all records in 'user' table
 *
 * @param {function} res
 * @public
 */
User.deleteAll = (res) => {
	connection.query(
		"DELETE FROM user WHERE id > 0",
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

/**
 * Deletes record in 'user' table with matching 'id'
 * 
 * @param {int} id
 * @param {function} res
 * @public
 */
User.deleteById = (id, res) => {
	
	if (isNaN(id)) {
		throw new TypeError(`Argument expected an instance of integer, received instance of ${typeof id}.`);
	}
	
	connection.query(
		"DELETE FROM user WHERE id = ?",
		id,
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

/**
 * Updates record in 'user' table with 'id'
 *
 * @param {int} id
 * @param {string} preferredName
 * @param {function} res
 * @public
 */
User.updatePreferredName = (id, preferredName, res) => {
	
	if (isNaN(id)) {
		throw new TypeError(`Argument expected an instance of integer, received instance of ${typeof id}.`);
	}
	
	if (typeof preferredName !== 'string') {
		throw new TypeError(`Argument expected an instance of string, received instance of ${typeof preferredName}.`);
	}
	
	if (preferredName.count === 0) {
		throw new Error('Argument must not be empty.');
	}
		
	connection.query(
		"UPDATE user SET preferredName = ? WHERE id  = ?",
		[preferredName, id],
		(error, data) => {
			if (error)
				res(error, null);
			else 
				res(null, data);
		}
	);
};

/**
 * Updates column 'lastLogin' in 'user' table with matching id
 *
 * @param {int} id
 * @param {date} lastLoginDate
 * @param {function} res
 * @public
 */
User.updateLastLogin = (id, lastLoginDate, res) => {
	
	if (isNaN(id)) {
		throw new TypeError(`Argument expected an instance of integer, received instance of ${typeof id}.`);
	}
	
	if (typeof lastLoginDate !== 'date') {
		throw new TypeError(`Argument expected an instance of date, received instance of ${typeof lastLogin}.`);
	}
	
	connection.query(
		"UPDATE user SET lastLogin = ? WHERE id = ?",
		[lastLoginDate, id],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

/**
 * Updates column 'dateOfBirth' in 'user' table for record with matching id
 *
 * @param {int} id
 * @param {string} dob
 * @param {function} res
 * @public
 */
 User.updateDateOfBirth = (id, dob, res) => {
 	
 	if (isNaN(id)) {
 		throw new TypeError(`Argument expected an instance of integer, received instance of ${typeof id}.`);
 	}
 	
 	if (Date.parse(dob)) {
 		throw new TypeError(`Argument is invalid date format.`);
 	}
 	
 	var dateOfBirth = new Date(dob);
 	
 	connection.query(
 		"UPDATE user SET dateOfBirth = ? WHERE id = ?",
 		[dateOfBirth, id],
 		(error, data) => {
 			if (error)
 				res(error, null);
 			else
 				res(null, data);
 		}
 	);
 };


module.exports = User;