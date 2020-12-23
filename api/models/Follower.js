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
		console.log(`${followerId} followed ${userId}`);
		res(null, "OK");
	}
	
	static findByUserId = (userId, res) => {
		res(null, db.filter(x => x.userId === userId));
	}
	
	static findByFollowerId = (followerId, res) => {
		res(null, db.filter(x => x.followerId === followerId));
	}
	
	static delete = (userId, followerId, res) => {
		res(null, db.filter(x => x.followerId === followerId && x.userId === userId));
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