'use strict';

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

/// Controller Methods
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

User.getById = (id, res) => {
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

User.getByUsername = (username, res) => {
	connection.query(
		"SELECT * FROM user WHERE username = ? ORDER BY username",
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

User.getByUsernameOrEmail = (input, res) => {
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

User.create = (user, res) => {
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


User.deleteById = (id, res) => {
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

// MARK: - PUT
User.updatePreferredName = (id, preferredName, res) => {
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

User.updateLastLogin = (id, lastLogin, res) => {
	connection.query(
		"UPDATE user SET lastLogin = ? WHERE id = ?",
		[lastLogin, id],
		(error, data) => {
			if (error)
				res(error, null);
			else
				res(null, data);
		}
	);
}



module.exports = User;