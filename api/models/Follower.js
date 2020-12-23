'use strict';

var connection = require('../database/mysql');

class Follower {
	
	constructor(model) {
		this.id = model.id;
		this.userId = model.userId;
		this.followerId = model.followerId;
		this.createTime = model.createTime;
	}
	
	static create = (userId, followerId, res) => {
		connection.query(
			"INSERT INTO followers SET ?",
			{ "userId": userId, "followerId": followerId },
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		)
	}
	
	static delete = (userId, followerId, res) => {
		connection.query(
			"DELETE FROM followers WHERE userId = ? AND followerId = ?",
			[userId, followerId],
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		)
	}
	
	static findByUserId = (userId, res) => {
		connection.query(
			"SELECT * FROM followers WHERE userId = ? ORDER BY followerId",
			userId,
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}	
		)
	}
	
	static findByFollowerId = (followerId, res) => {
		connection.query(
			"SELECT * FROM followers WHERE followerId = ? ORDER BY userId",
			followerId,
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		)
	}
	
	static findByUserIdAndFollowerId = (userId, followerId, res) => {
		connection.query(
			"SELECT * FROM followers WHERE userId = ? AND followerId = ? ORDER BY createTime",
			[userId, followerId],
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		)
	}
};

var db = [
	new Follower({
		"id": 1,
		"userId": 14,
		"followerId": 15,
		"createTime": Date()
	})
];

module.exports = Follower;

/**

followers table schema:

CREATE TABLE followers(
	CHECK (followerId <> userId),
	id INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	followerId INT NOT NULL,
	createTime DATETIME,
	PRIMARY KEY (id),
	FOREIGN KEY (userId) REFERENCES users(id),
	FOREIGN KEY (followerId) REFERENCES users(id)
);



*/