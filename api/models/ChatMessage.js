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
		this.id 				= model.id;
		this.roomId				= model.roomId;
		this.body 				= model.body;
		this.parentMessageId 	= model.parentMessageId;
		this.creatorId 			= model.creatorId;
		this.createdDate 		= model.createdDate;
		this.editedDate 		= model.editedDate;
	}
	
	/**
	 * @api public
	 */
	
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
		"createdDate": Date(),
		"editedDate": Date()
	}),
	new ChatMessage({
		"id": 2,
		"roomId": 1,
		"body": "Test reply.",
		"parentMessageId": 1,
		"creatorId": 15,
		"createdDate": Date(),
		"editedDate": Date()
	}),
	new ChatMessage({
		"id": 3,
		"roomId": 1,
		"body": "Test reply #2.",
		"parentMessageId": 2,
		"creatorId": 14,
		"createdDate": Date(),
		"editedDate": Date()
	})
];

module.exports = ChatMessage;