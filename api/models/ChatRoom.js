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
	};
	
	static findById = (id, next) => {
		connection.query(
			"SELECT * FROM chatRooms WHERE ?? = ?",
			['id', id],
			(error, data) => {
				if (error)
					next(error, null);
				else
					next(null, data);
			}
		);
	};
};

module.exports = ChatRoom;

/**

`chatRooms` table schema:

CREATE TABLE chatRooms(
	id INT NOT NULL AUTO_INCREMENT,
	userId int NOT NULL,
	name VARCHAR(64),
	createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES users(id),
	UNIQUE (id)
);

*/