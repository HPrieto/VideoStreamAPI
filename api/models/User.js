'use strict';

var connection = require('../database/mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var User = function(model) {
	this.id 		 	= model.id;
	this.token			= model.token;
	this.username 	 	= model.username;
	this.password 	 	= model.password;
	this.email 		 	= model.email;
	this.firstName 	 	= model.firstName;
	this.lastName 	 	= model.lastName;
	this.phoneNumber 	= model.phoneNumber;
	this.description	= model.description;
	this.birthDate 		= model.birthDate;
	this.createTime 	= model.createTime;
	this.updateTime 	= model.updateTime;
	this.deleteTime 	= model.deleteTime;
	this.tokenExpireTime = model.tokenExpireTime;
	this.timeZone 		= model.timeZone;
	this.regionCode 	= model.regionCode;
	this.languageCode 	= model.languageCode;
	this.imageUrl		= model.imageUrl;
	this.isActive		= model.isActive;
};

User.findAll = (res) => {
	connection.query(
		"SELECT id, username, firstName, lastName, email, description, phoneNumber, birthDate, imageUrl FROM users ORDER BY id",
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		});
};

User.findById = (id, res) => {
	connection.query(
		"SELECT * FROM users WHERE ?? = ? ORDER BY id",
		['id', id],
		(error, data) => {
			if (error) {
				res(error, null);
			} else {
				res(null, data);
			}
		}
	);
};

User.findByToken = (token, res) => {
	connection.query(
		"SELECT * FROM users WHERE ?? = ?",
		['token', token],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
}

User.findByUsername = (username, res) => {
	connection.query(
		"SELECT id, username, firstName, lastName, email, description, phoneNumber, birthDate, imageUrl FROM users WHERE ?? = ? ORDER BY username",
		["username",username],
		(error, data) => {
			if (error) {
				res(error, null);
			} else {
				res(null, data);
			}
		}
	);
};

User.findByEmail = (email, res) => {
	connection.query(
		"SELECT * FROM users WHERE ?? LIKE ?",
		[`email`, email],
		(error, data) => {
			if (error) {
				res(error, null);
			} else {
				res(null, data);
			}
		}
	);
};

User.findByUsernameOrEmail = (username, email, res) => {
	connection.query(
		"SELECT * FROM users WHERE ?? LIKE ? OR ?? = ?",
		['username', username, 'email', email],
		(error, data) => {
			if (error) {
				res(error, null);
			} else {
				res(null, data);
			}
		}
	);
}

User.findByUsernameOrEmail = (usernameOrEmail, res) => {
	connection.query(
		"SELECT * FROM users WHERE ?? = ? OR ?? = ? LIMIT 1",
		['username', usernameOrEmail, 'email', usernameOrEmail],
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
		"DELETE FROM users WHERE ?? = ?",
		['id', id],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
};

// MARK: - PUT

User.updateLastLogin = (id, res, lastLoginTime = new Date()) => {
	connection.query(
		"UPDATE users SET ?? = ? WHERE ?? = ?",
		['lastLoginTime', lastLoginTime, 'id', id],
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
		"UPDATE users SET ?? = ?, updateTime = CURRENT_TIMESTAMP WHERE ?? = ?",
		['password', newPassword, 'id', id],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		});
}

/**
 * Updates the email for a given user with id.
 * @param {int} id
 * @param {string} email
 * @api public
 */
User.updateEmailForUserWithId = (id, newEmail, res) => {
	connection.query(
		"UPDATE users SET ?? = ?, updateTime = CURRENT_TIMESTAMP WHERE ?? = ?",
		['email', newEmail, 'id', id],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		});
}

/**
 * Updates the description for a given user with id.
 * @param {int} id
 * @param {string} description
 * @api public
 */
User.updateDescriptionForUserWithId = (id, newDescription, res) => {
	connection.query(
		"UPDATE users SET ?? = ?, updateTime = CURRENT_TIMESTAMP WHERE ?? = ?",
		['description', newDescription, 'id', id],
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

/**
users table schema:

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	token VARCHAR(256),
	username VARCHAR(64) NOT NULL,
	password VARCHAR(128) NOT NULL,
	firstName VARCHAR(64) NOT NULL,
	lastName VARCHAR(64),
	email VARCHAR(64) NOT NULL,
	description VARCHAR(256),
	phoneNumber VARCHAR(32),
	birthDate DATE,
	lastLoginTime DATETIME,
	createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
	deleteTime DATETIME,
	updateTime DATETIME,
	tokenExpireTime DATETIME,
	timeZone VARCHAR(32),
	regionCode VARCHAR(32),
	languageCode VARCHAR(32),
	imageUrl VARCHAR(256),
	isActive TINYINT(1) DEFAULT 1,
	PRIMARY KEY (id),
	UNIQUE (id),
	UNIQUE (username),
	UNIQUE (email),
	UNIQUE (token)
);
*/