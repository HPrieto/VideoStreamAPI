'use strict';

/**
 * Models
 */
var ChatModel = require('../models/ChatModel');
var ChatRoom = require('../models/ChatRoom');
var ChatMessage = require('../models/ChatMessage');
var ChatRoomMember = require('../models/ChatRoomMember');
var HttpError = require('../utils/HttpError');
var HttpResponse = require('../utils/HttpResponse');

exports.sendMessage = (req, res) => {
	
	if (!req.body) {
		HttpError.send(400, 'Invalid request.', res);
		return;
	}
	
	var message = req.body.body;
	
	console.log(message);
	
	req.io.emit('chat', message);
	
	res.sendStatus(200);
	
	// ChatMessage.create(req.body, (error, data) => {
	// 	if (error)
	// 		HttpError.sendError(error, res);
	// 	else
	// 		HttpResponse.send(200, data, res);
	// });
};

exports.deleteMessage = (req, res) => {
	if (isNaN(req.params.id)) {
		HttpError.send(400, 'Invalid request.', res);
		return;
	}
	var id = parseInt(req.params.id);
	ChatMessage.delete(id, (error, data) => {
		if (error)
			HttpError.sendError(error, res);
		else
			HttpResponse.send(data, res);
	});
};

// @Get Methods

exports.findChatRoomsByUserId = (req, res) => {
	
	if (isNaN(req.params.id)) {
		HttpError.send(400, 'Invalid request.', res);
		return;
	}
	
	var userId = parseInt(req.params.id);
	console.log("User ID:", userId);
	ChatRoomMember.findByUserId(userId, (error, data) => {
		if (error) {
			HttpError.sendError(error, res);
			return;
		}
		var roomIds = data.map(x => x.roomId);
		console.log(roomIds);
		ChatRoom.findByIds(roomIds, (err, rooms) => {
			if (err)
				HttpError.sendError(err, res);
			else
				HttpResponse.send(rooms, res);
		});
	});
};

exports.findMessagesByRoomId = (req, res) => {
	if (isNaN(req.params.id)) {
		HttpError.send(404, 'Invalid request.', res);
		return;
	}
	var roomId = parseInt(req.params.id);
	ChatMessage.findByRoomId(roomId, (error, messages) => {
		if (error)
			HttpError.sendError(error, res);
		else
			HttpResponse.send(messages, res);
	});
};

exports.findMessagesByCreatorId = (req, res) => {
	var creatorId = parseInt(req.params.creatorId);
	ChatMessage.findByCreatorId(creatorId, (error, messages) => {
		if (error)
			HttpError.sendError(error, res);
		else
			HttpResponse.send(messages, res);
	});
};

exports.updateMessageBody = (req, res) => {	
	var id = req.params.id;
	var newBody = req.body.newBody;
	
	if (isNaN(id)) {
		HttpError.send(400, 'Invalid type `id`. Must be a number.');
		return;
	}
	
	if (typeof body !== 'string') {
		HttpError.send(400, 'Invalid type `newBody`. Must be a string.');
		return;
	}
	
	if (body.length > 512) {
		HttpError.send(400, 'Message is too long. Must be less than 512 characters.');
		return;
	}
	
	ChatMessage.updateMessageBody(id, newBody, (error, data) => {
		if (error) {
			HttpError.sendSqlError(error, res);
			return;
		}
		HttpResponse.send(data, res);
	});
};

exports.chat = (req, res) => {
	
	req.io.emit('chat', 'test');
};