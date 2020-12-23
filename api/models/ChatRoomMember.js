'use strict';

var connection = require('../database/mysql');

class ChatRoomMember {
	
	constructor(model) {
		this.id 			= model.id;
		this.roomId			= model.roomId;
		this.userId 		= model.userId;
		this.isRead 		= model.isRead;
		this.findByUserId 	= model.findByUserId;
		this.createTime 	= model.createTime;
		this.updateTime 	= model.updateTime;
		this.deleteTime 	= model.deleteTime;
		this.timeZone 		= model.timeZone;
		this.regionCode 	= model.regionCode;
		this.languageCode 	= model.languageCode;
	}
	
	static findAll (next) {
		next(null, db);
	}
	
	static findByUserId (userId, next) {
		next(null, db.filter(member => member.userId === userId));
	}
	
	static create (model, next) {
		db.push(model);
		next(null, db);
	}
};

var db = [
	new ChatRoomMember({
		"id": 1,
		"roomId": 1,
		"userId": 15,
		"isRead": 0,
		"timeZone": "",
    	"regionCode": "419",
    	"languageCode": "en-US"
	}),
	new ChatRoomMember({
		"id": 2,
		"roomId": 1,
		"userId": 14,
		"isRead": 0,
		"timeZone": "",
    	"regionCode": "419",
    	"languageCode": "en-US"
	})
];

module.exports = ChatRoomMember;

/**

`chatRoomMember` table schema:

CREATE TABLE chatRoomMembers(
	id INT NOT NULL AUTO_INCREMENT,
	roomId INT NOT NULL,
	userId INT NOT NULL,
	isAdmin TINYINT(1) DEFAULT 0,
	timeZone VARCHAR(32),
	regionCode VARCHAR(32),
	languageCode VARCHAR(32),
	PRIMARY KEY (id),
	FOREIGN KEY (roomId) REFERENCES chatRooms(id),
	FOREIGN KEY (userId) REFERENCES users(id),
	UNIQUE (id)
);

*/