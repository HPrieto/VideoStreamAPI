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
	};
	
	static findAll (next) {
		connection.query(
			"SELECT * FROM chatRoomMembers",
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		);
	};
	
	static findById (id, next) {
		connection.query(
			"SELECT * FROM chatRoomMembers WHERE ?? = ?",
			['id', id],
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		);
	};
	
	static findByUserId (userId, next) {
		connection.query(
			"SELECT * FROM chatRoomMembers WHERE ?? = ?",
			['userId', userId],
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		);
	};
	
	static findByRoomId (roomId, next) {
		connection.query(
			"SELECT * FROM chatRoomMembers WHERE ?? = ?",
			['roomId', roomId],
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		);
	};
	
	static create (newMember, next) {
		connection.query(
			"INSERT INTO chatRoomMembers SET ?",
			newMember,
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		);
	};
	
	static delete (roomId, userId, next) {
		connection.query(
			"DELETE * FROM chatRoomMembers WHERE ?? = ? AND ?? = ?",
			['roomId', roomId, 'userId', userId],
			(error, data) => {
				if (error) {
					res(error, null);
				} else {
					res(null, data);
				}
			}
		);
	};
	
	static makeAdmin (roomId, userId, next) {
		connection.query(
			"UPDATE chatRoomMembers SET isAdmin = 1 WHERE ?? = ? AND ?? = ?",
			['roomId', roomId, 'userId', userId],
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		);
	};
	
	static removeAdmin (roomId, userId, next) {
		connection.query(
			"UPDATE chatRoomMembers SET isAdmin = 0 WHERE ?? = ? AND ?? = ?",
			['roomId', roomId, 'userId', userId],
			(error, data) => {
				if (error)
					res(error, null);
				else
					res(null, data);
			}
		);
	};
};

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
	createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (roomId) REFERENCES chatRooms(id),
	FOREIGN KEY (userId) REFERENCES users(id),
	UNIQUE (id)
);

*/