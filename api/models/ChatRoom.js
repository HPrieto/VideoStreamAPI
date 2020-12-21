'use strict';

class ChatRoom {
	
	constructor(model) {
		this.id = model.id;
		this.name = model.name;
		this.createdDate = model.createdDate;
		this.createdBy = model.createdBy;
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
		"createdDate": Date(),
		"createdBy": 1
	}),
	new ChatRoom({
		"id": 2,
		"name": "Group 2",
		"createdDate": Date(),
		"createdBy": 2
	})
];

module.exports = ChatRoom;