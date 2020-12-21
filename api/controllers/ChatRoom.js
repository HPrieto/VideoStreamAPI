'use strict';

var ChatModel = require('../models/ChatModel');
var ChatRoom = require('../models/ChatRoom');
var ChatMessage = require('../models/ChatMessage');
var ChatRoomMember = require('../models/ChatRoomMember');

exports.sendMessage = (req, res) => {
	
};

exports.findChatRoomsByUserId = (req, res) => {
	var userId = parseInt(req.params.userId);
	console.log("User ID:", userId);
	ChatRoomMember.findByUserId(userId, (error, data) => {
		if (error) {
			res.status(500).send(error);
			return;
		}
		var roomIds = data.map(x => x.roomId);
		console.log(roomIds);
		ChatRoom.findByIds(roomIds, (err, rooms) => {
			if (err) {
				res.status(500).send(err);
				return;
			}
			res.status(200).send(rooms);
		});
	});
}

exports.findMessagesByRoomId = (req, res) => {
	var roomId = parseInt(req.params.roomId);
	ChatMessage.findByRoomId(roomId, (error, messages) => {
		if (error) {
			res.status(500).send(error);
			return;
		}
		res.status(200).send(messages);
	});
};

exports.findMessagesByCreatorId = (req, res) => {
	
};