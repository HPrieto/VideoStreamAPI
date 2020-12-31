'use strict';

var controller = require('../controllers/ChatRoom');

module.exports = (app) => {
	
	app.route('/api/chat/send/message')
		.post(controller.sendMessage);
	
	app.route('/api/chat/message/:id/delete')
		.delete(controller.deleteMessage);
	
	app.route('/api/chat/rooms/user/:id')
		.get(controller.findChatRoomsByUserId);
	
	app.route('/api/chat/room/:id/messages')
		.get(controller.findMessagesByRoomId);
		
	app.route('/api/chat/:roomId')
		.get(controller.chat);
	
	// ChatRoomMember Routes
	
};