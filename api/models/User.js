'use strict';

/**
 * Module dependencies.
 * @private
 */
var connection = require('../database/mysql');
var utils = require('../Utils');

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
 
/**
 * @title Fetch all users in 'user' table.
 * @verb GET
 * 
 * @desc Fetches all records in user table.
 * @public
 */
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
 * @title Fetch Record in user Table with id
 * @verb GET
 *
 * @param {int} id: ID of record in user table.
 * @param {function} res: Response callback.
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
 * @title Fetch Record in user Table with username.
 * @verb GET
 * 
 * @desc Fetches record in user table with matching username.
 * 		 Column 'username' is UNIQUE in user table
 *
 * @param {string} username
 * @param {function} res
 * @public
 */
User.getByUsername = (username, res) => {
	
	if (!utils.isUsername(username)) {
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
 * Fetch Record in 'user' Table with Matching 'username' or 'email' column value.
 * @verb GET
 *
 * @param {string} input
 * @param {function} res
 * @public
 */
User.getByUsernameOrEmail = (input, res) => {
	
	if (!utils.isUsername(input) && !utils.isEmail(input)) {
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
 * @Title Create New User.
 * @verb PUT
 * 
 * @desc Inserts new record into 'user' table.
 *
 * @param {object} user
 * @param {function} res
 * @public
 */
User.create = (user, res) => {
	var newUser = new User(user);
	
	if (typeof newUser !== 'object') {
		throw new TypeError(`Argument expected instance of object, received instance of ${typeof user}.`);
	}
	
	if (!utils.isName(newUser.firstName)) {
		throw new TypeError(`Instance object of User contains invalid First Name.`);
	}
	
	if (!utils.isUsername(newUser.username)) {
		throw new TypeError(`Instance object of User contains invalid Username.`);
	}
	
	if (!utils.isPassword(newUser.password)) {
		throw new TypeError(`Instance object of User contains invalid Password.`);
	}
	
	if (!utils.isEmail(newUser.email)) {
		throw new TypeError(`Instance object of User contains invalid Email.`);
	}
	
	connection.query(
		"INSERT INTO user SET ?",
		newUser,
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

/**
 * @title Delete All Users.
 * @verb DELETE
 * 
 * @desc Deletes every record in 'user' table.
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
 * @title Delete User with ID
 * @verb DELETE
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
 * @title Update User with ID
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
 * @title Update Last Login DateTime Field for User.
 * @verb PUT
 * 
 * @desc Updates the 'lastLogin' column field for record with 'id' in 'user' table.
 *
 * @param {int} id
 * @param {string<Date-Time>} lastLoginDate
 * @param {function} res
 * @public
 */
User.updateLastLogin = (id, lastLoginDate, res) => {
	
	if (isNaN(id)) {
		throw new TypeError(`Argument expected an instance of integer, received instance of ${typeof id}.`);
	}
	
	if (!utils.isDate(lastLoginDate)) {
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
 * @title Update Date Of Birth for User.
 * @verb PUT
 * 
 * @desc Updates 'dateOfBirth' column for record with 'id' in 'user' table.
 *
 * @param {int} id
 * @param {Date} dob
 * @param {function} res
 * @public
 */
 User.updateDateOfBirth = (id, dob, res) => {
 	var dateOfBirth = new Date(dob);
 	
 	if (isNaN(id)) {
 		throw new TypeError(`Argument expected an instance of integer, received instance of ${typeof id}.`);
 	}
 	
 	if (!utils.isDate(dateOfBirth)) {
 		throw new TypeError(`Argument is invalid date format.`);
 	}
 	
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