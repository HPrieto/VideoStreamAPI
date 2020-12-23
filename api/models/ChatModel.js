'use strict';

class ChatModel {
	
	constructor(model) {
		if (!model.hasOwnProperty('room')) {
			throw new Error("`room` is a required property.");
		}
		if (!model.hasOwnProperty('messages')) {
			throw new Error('`messages` is a required property.');
		}
		if (!model.hasOwnProperty('members')) {
			throw new Error('`members` is a required property.');
		}
		this.room 		= model.room;
		this.messages 	= model.messages;
		this.members 	= model.members;
	}
}

module.exports = ChatModel;