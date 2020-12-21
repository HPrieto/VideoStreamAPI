'use strict';

var controller = require('../controllers/ChatRoom');

module.exports = (app) => {
	
	app.route('/api/chat/:userId/rooms')
		.get(controller.findChatRoomsByUserId);
	
	app.route('/api/chat/:roomId/room-messages')
		.get(controller.findMessagesByRoomId);
};