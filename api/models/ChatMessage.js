'use strict';

var connection = require('../database/mysql');

/**
 `directMessages` table schema:
 
 CREATE TABLE directMessages(
 	id INT NOT NULL AUTO_INCREMENT,
 	body BLOB,
 	parentMessageId INT,
 	creatorId INT NOT NULL,
 	createdDate DATETIME,
 	editedDate DATETIME
 )
*/

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
		"parentMessageId": 0,
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
		"parentMessageId": 1,
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
		"parentMessageId": 2,
		"creatorId": 14,
		"createTime": Date(),
		"updateTime": Date(),
		"timeZone": "",
    	"regionCode": "419",
    	"languageCode": "en-US"
	})
];

module.exports = ChatMessage;