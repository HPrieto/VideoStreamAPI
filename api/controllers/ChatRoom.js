'use strict';

var ChatModel = require('../models/ChatModel');
var ChatRoom = require('../models/ChatRoom');
var ChatMessage = require('../models/ChatMessage');
var ChatRoomMember = require('../models/ChatRoomMember');
var HttpError = require('../utils/HttpError');
var HttpResponse = require('../utils/HttpResponse');

exports.sendMessage = (req, res) => {
	
	ChatMessage.create(req.body, (error, data) => {
		
	});
};

exports.findChatRoomsByUserId = (req, res) => {
	var userId = parseInt(req.params.userId);
	console.log("User ID:", userId);
	ChatRoomMember.findByUserId(userId, (error, data) => {
		if (error) {
			HttpError.sendError(error, res);
			return;
		}
		var roomIds = data.map(x => x.roomId);
		console.log(roomIds);
		ChatRoom.findByIds(roomIds, (err, rooms) => {
			if (err) {
				HttpError.sendError(err, res);
				return;
			}
			HttpResponse.send(rooms, res);
		});
	});
}

exports.findMessagesByRoomId = (req, res) => {
	var roomId = parseInt(req.params.roomId);
	ChatMessage.findByRoomId(roomId, (error, messages) => {
		if (error) {
			HttpError.sendError(error, res);
			return;
		}
		HttpResponse.send(messages, res);
	});
};

exports.findMessagesByCreatorId = (req, res) => {
	var creatorId = parseInt(req.params.creatorId);
	ChatMessage.findByCreatorId(creatorId, (error, messages) => {
		if (error) {
			HttpError.sendError(error, res);
			return;
		}
		HttpResponse.send(messages, res);
	});
};