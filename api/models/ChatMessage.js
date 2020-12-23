'use strict';

var connection = require('../database/mysql');

class ChatMessage {
	
	/**
	 * @param {object} model
	 * @api public
	 */
	constructor(model) {
		this.id 			= model.id;
		this.roomId			= model.roomId;
		this.body 			= model.body;
		this.parentId 		= model.parentId;
		this.creatorId 		= model.creatorId;
		this.createTime 	= model.createTime;
		this.updateTime 	= model.updateTime;
		this.deleteTime 	= model.deleteTime;
		this.timeZone 		= model.timeZone;
		this.regionCode 	= model.regionCode;
		this.languageCode 	= model.languageCode;
	}
	
	/**
	 * @api public
	 */
	 
	static create = (message, next) => {
		
	}
	
	static findById = (id, next) => {
		next(null, db.find(message => message.id === id));
	};
	
	static findByRoomId = (roomId, next) => {
		next(null, db.filter(x => x.roomId === roomId));
	}
	
	static findByCreatorId = (creatorId, next) => {
		next(null, db.filter(x => x.creatorId === creatorId));
	}
	
	static findByParentId = (parentId, next) => {
		next(null, db.filter(x => x.parentId === parentId));
	}
	
	static updateMessageBody = (id, newBody, next) => {
		var directMessage = db.find(message => message.id === id);
		directMessage.body = newBody
		next(null, directMessage);
	}
};

var db = [
	new ChatMessage({
		"id": 1,
		"roomId": 1,
		"body": "Test message.",
		"parentId": 0,
		"creatorId": 14,
		"createTime": Date(),
		"updateTime": Date(),
		"timeZone": "",
    	"regionCode": "419",
    	"languageCode": "en-US"
	}),
	new ChatMessage({
		"id": 2,
		"roomId": 1,
		"body": "Test reply.",
		"parentId": 1,
		"creatorId": 15,
		"createTime": Date(),
		"updateTime": Date(),
		"timeZone": "",
    	"regionCode": "419",
    	"languageCode": "en-US"
	}),
	new ChatMessage({
		"id": 3,
		"roomId": 1,
		"body": "Test reply #2.",
		"parentId": 2,
		"creatorId": 14,
		"createTime": Date(),
		"updateTime": Date(),
		"timeZone": "",
    	"regionCode": "419",
    	"languageCode": "en-US"
	})
];

module.exports = ChatMessage;

/**

`chatMessages` table schema;

CREATE TABLE chatMessages(
	id INT NOT NULL AUTO_INCREMENT,
	roomId INT NOT NULL,
	userId INT NOT NULL,
	body VARCHAR(512),
	parentId INT,
	createTime DATETIME,
	updateTime DATETIME,
	timeZone VARCHAR(32),
	regionCode VARCHAR(32),
	languageCode VARCHAR(32),
	PRIMARY KEY (id),
	FOREIGN KEY (roomId) REFERENCES chatRooms(id),
	FOREIGN KEY (userId) REFERENCES users(id),
	UNIQUE (id)
);

 */