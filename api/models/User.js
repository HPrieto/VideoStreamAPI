'use strict';

var connection = require('../database/mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

var User = function(model) {
	this.id 		 = model.id;
	this.username 	 = model.username;
	this.password 	 = model.password;
	this.email 		 = model.email;
	this.firstName 	 = model.firstName;
	this.lastName 	 = model.lastName;
	this.preferredName = model.preferredName;
	this.phoneNumber = model.phoneNumber;
	this.dateOfBirth = model.dateOfBirth;
	this.createdDate = model.createdDate;
};

User.findAll = (res) => {
	connection.query(
		"SELECT * FROM users ORDER BY id",
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		});
};

User.findById = (id, res) => {
	connection.query(
		"SELECT * FROM users WHERE id = ? ORDER BY id",
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

User.findByUsername = (username, res) => {
	connection.query(
		"SELECT * FROM users WHERE username = ? ORDER BY username",
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

User.findByUsernameOrEmail = (input, res) => {
	connection.query(
		"SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1",
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

User.create = (user, res) => {
	connection.query(
		"INSERT INTO users SET ?",
		user,
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

User.deleteAll = (res) => {
	connection.query(
		"DELETE FROM users WHERE id > 0",
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};


User.deleteById = (id, res) => {
	connection.query(
		"DELETE FROM users WHERE id = ?",
		id,
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

// MARK: - PUT
User.updatePreferredName = (id, preferredName, res) => {
	connection.query(
		"UPDATE users SET preferredName = ? WHERE id  = ?",
		[preferredName, id],
		(error, data) => {
			if (error)
				res(error, null);
			else 
				res(null, data);
		}
	);
};

User.updateLastLogin = (id, lastLogin, res) => {
	connection.query(
		"UPDATE users SET lastLogin = ? WHERE id = ?",
		[lastLogin, id],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
}

/**
 * Updates the password for a given user with id.
 * @param {int} id
 * @param {string} oldPassword
 * @param {string} newPassword
 * @api public
 */
User.updatePasswordForUserWithId = (id, newPassword, res) => {
	connection.query(
		"UPDATE users SET password = ? WHERE id = ?",
		[newPassword, id],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		});
}

/**
 * Module Utils.
 */

/**
 * Checks if non-hashed string is equal to hash.
 * @param {string} str 
 * @param {string} hash
 * @param {function} done
 * @api public
 */
User.matching = (str, hash, done) => {
	done(bcrypt.compareSync(str, hash));
}

/**
 * Encrypts a string.
 * @param {string} str
 * @api public
 */
User.encrypted = (str) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(str, salt);
}

User.validUsername = (username) => {
	return User.validString(username,
		"^" +
		"(?=.*[a-zA-Z\_])" + // only letters and dashes allowed
		"(?=.{2,})" // 2 characters or longer
	);
}

User.validPassword = (password) => {
	return User.validString(password, 
		"^" +
		"(?=.*[a-z])" + // 1 lowercase letter
		"(?=.*[A-Z])" + // 1 uppercase letter
		"(?=.*[0-9])" + // 1 numeric
		// "(?=.*[!@#$%^&*])" + // 1 special character from list
		"(?=.{6,})" // 6 characters or longer
	);
}

User.validEmail = (email) => {
	return User.validString(email,
		"^" +
		"(?=.*[@])" + // all emails contains "." and "@" characters
		"(?=.{3,})" // email should be at least 3 characters long
	);
}

User.validString = (str, regex) => {
	var regex = new RegExp(regex);
	return typeof str === "string" & regex.test(str); 
}


module.exports = User;