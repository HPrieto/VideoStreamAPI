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
		this.senderId 		= model.senderId;
		this.sendTime 		= model.sendTime;
		this.updateTime 	= model.updateTime;
		this.deleteTime 	= model.deleteTime;
		this.timeZone 		= model.timeZone;
		this.regionCode 	= model.regionCode;
		this.languageCode 	= model.languageCode;
	};
	
	/**
	 * @api public
	 */
	 
	static create = (newMessage, next) => {
		connection.query(
			"INSERT INTO chatMessages SET ?",
			newMessage,
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		);
	};
	
	static delete = (id, next) => {
		
		if (isNaN(id)) {
			next(new Error("Invalid parameter type for parameter `id`"), null);
			return;
		}
		
		connection.query(
			"DELETE FROM chatMessages WHERE ?? = ?",
			['id', id],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			});
	};
	
	static findById = (id, next) => {
		
		if (isNaN(id)) {
			next(new Error("Invalid parameter type for parameter `id`"), null);
			return;
		}
		
		connection.query(
			"SELECT * FROM chatMessages WHERE ?? = ?",
			['id', id],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			});
	};
	
	static findByRoomId = (roomId, next) => {
		
		if (isNaN(roomId)) {
			next(new Error("Invalid parameter type for parameter `roomId`."), null);
			return;
		}
		
		connection.query(
			"SELECT * FROM chatMessages WHERE ?? = ?",
			['roomId', roomId],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			});
	};
	
	static findBySenderId = (senderId, next) => {
		
		if (isNaN(senderId)) {
			next(new Error("Invalid parameter type for parameter `senderId`."), null);
			return;
		}
		
		connection.query(
			"SELECT * FROM chatMessages WEHRE ?? = ?",
			['roomId', roomId],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			});
	};
	
	static findByParentId = (parentId, next) => {
		
		if (isNaN(parentId)) {
			next(new Error("Invalid parameter type for parameter `parentId`"), null);
			return;
		}
		
		connection.query(
			"SELECT * FROM chatMessages WHERE ?? = ?",
			['parentId', parentId],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		);
	};
	
	static updateMessageBody = (id, newBody, next) => {
		
		if (isNaN(id)) {
			next(new Error("Invalid parameter type for parameter `id`"), null);
			return;
		}
		
		if (typeof newBody !== 'string') {
			next(new Error("Invalid parameter type for parameter `newBody`."), null);
			return;
		}
		
		connection.query(
			"UPDATE chatMessages SET ?? = ? AND updateTime = CURRENT_TIMESTAMP WHERE ?? = ?",
			['body', newBody, 'id', id],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		);
	};
};

module.exports = ChatMessage;

/**

`chatMessages` table schema;

CREATE TABLE chatMessages(
	id INT NOT NULL AUTO_INCREMENT,
	roomId INT NOT NULL,
	senderId INT NOT NULL,
	body VARCHAR(512),
	parentId INT,
	sendTime DATETIME DEFAULT CURRENT_TIMESTAMP,
	updateTime DATETIME,
	timeZone VARCHAR(32),
	regionCode VARCHAR(32),
	languageCode VARCHAR(32),
	PRIMARY KEY (id),
	FOREIGN KEY (roomId) REFERENCES chatRooms(id),
	FOREIGN KEY (senderId) REFERENCES users(id),
	UNIQUE (id)
);

 */