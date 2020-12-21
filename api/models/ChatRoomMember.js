'use strict';

var connection = require('../database/mysql');

/**

directMessageRecipients table schema:

CREATE TABLE directMessageRecipients(
	id INT NOT NULL AUTO_INCREMENT,
	recipientId INT NOT NULL,
	messageId INT NOT NULL,
	isRead TINYINT(1)
)

*/

class ChatRoomMember {
	
	constructor(model) {
		this.id 	= model.id;
		this.roomId	= model.roomId;
		this.userId = model.userId;
		this.isRead = model.isRead;
		this.findByUserId = model.findByUserId;
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
		"isRead": 0
	}),
	new ChatRoomMember({
		"id": 2,
		"roomId": 1,
		"userId": 14,
		"isRead": 0
	})
];

module.exports = ChatRoomMember;