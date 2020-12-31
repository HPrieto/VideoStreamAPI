'use strict';

var connection = require('../database/mysql');

class Follower {
	
	constructor(model) {
		this.id = model.id;
		this.userId = model.userId;
		this.followerId = model.followerId;
		this.createTime = model.createTime;
	};
	
	static create = (userId, followerId, next) => {
		connection.query(
			"INSERT INTO followers SET ?",
			{ "userId": userId, "followerId": followerId },
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		)
	};
	
	static delete = (userId, followerId, next) => {
		connection.query(
			"DELETE FROM followers WHERE ?? = ? AND ?? = ?",
			['userId', userId, 'followerId', followerId],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		)
	};
	
	static findByUserId = (userId, next) => {
		var query = "SELECT \n" +
			"a.id, " +
			"a.username, " +
			"a.firstName, " +
			"a.lastName, " +
			"a.email, " +
			"a.imageUrl \n" +
			"FROM \n" +
			"users a, " +
			"followers b \n" +
			"WHERE \n" +
			"a.id = b.userId \n" +
			"AND ?? = ?";
			
		connection.query(
			query,
			['b.userId', userId],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}	
		)
	};
	
	static findByFollowerId = (followerId, next) => {
		var query = "SELECT \n" +
			"a.id, " +
			"a.username, " +
			"a.firstName, " +
			"a.lastName, " +
			"a.email, " +
			"a.imageUrl \n" +
			"FROM \n" +
			"users a, " +
			"followers b \n" +
			"WHERE \n" +
			"a.id = b.followerId \n" +
			"AND ?? = ?";
		
		connection.query(
			query,
			['b.followerId', followerId],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		)
	};
	
	static findByUserIdAndFollowerId = (userId, followerId, next) => {
		connection.query(
			"SELECT * FROM followers WHERE ?? = ? AND ?? = ? ORDER BY createTime",
			['userId', userId, 'followerId', followerId],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		)
	};
};

module.exports = Follower;

/**

followers table schema:

CREATE TABLE followers(
	CHECK (followerId <> userId),
	id INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	followerId INT NOT NULL,
	createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (userId) REFERENCES users(id),
	FOREIGN KEY (followerId) REFERENCES users(id)
);



*/