'use strict';

class ChatRoom {
	
	constructor(model) {
		this.id 			= model.id;
		this.name 			= model.name;
		this.createTime 	= model.createTime;
		this.updateTime 	= model.updateTime;
		this.deleteTime 	= model.deleteTime;
		this.timeZone 		= model.timeZone;
		this.regionCode 	= model.regionCode;
		this.languageCode 	= model.languageCode;
	}
	
	static findById = (id, done) => {
		done(null, db.filter(x => x.id === id));
	}
	
	static findByIds = (roomIds, next) => {
		next(null, db.filter(x => roomIds.includes(x.id)));
	}
}

var db = [
	new ChatRoom({
		"id": 1,
		"name": "Group 1",
		"createTime": Date(),
		"createdBy": 1,
		"timeZone": "",
    	"regionCode": "419",
    	"languageCode": "en-US"
	}),
	new ChatRoom({
		"id": 2,
		"name": "Group 2",
		"createTime": Date(),
		"createdBy": 2
	})
];

module.exports = ChatRoom;

/**

`chatRooms` table schema:

CREATE TABLE chatRooms(
	id INT NOT NULL AUTO_INCREMENT,
	userId int NOT NULL,
	name VARCHAR(64),
	createTime DATETIME,
	FOREIGN KEY (userId) REFERENCES users(id),
	UNIQUE (id)
);

*/