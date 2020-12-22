'use strict';

var controller = require('../controllers/ChatRoom');

module.exports = (app) => {
	
	app.route('/api/chat/send/message')
		.post(controller.sendMessage);
	
	app.route('/api/chat/rooms/:userId')
		.get(controller.findChatRoomsByUserId);
	
	app.route('/api/chat/messages/:roomId')
		.get(controller.findMessagesByRoomId);
};