'use strict';

/**
 * @title Home Controller for path: /api/
 * @public
 */
 
 exports.generateDate = (req, res) => {
 	var date = new Date();
 	var urlEncoded = encodeURI(date);
 	var responseObject = {
 		"date": date,
 		"encoded": urlEncoded
 	};
 	res.send(responseObject);
 };
 
 // new Date(year, month, day, hours, minutes, seconds, milliseconds)
 exports.generateDMY = (req, res) => {
 	var day = req.params.day;
 	var month = req.params.month - 1;
 	var year = req.params.year;
 	if (isNaN(day) || isNaN(month) || isNaN(year)) {
 		throw new TypeError('Day, Month and Year must be numbers.');
 	}
 	var date = new Date(year, month, day);
 	var urlEncoded = encodeURI(date);
 	var responseObject = {
 		"date": date,
 		"encoded": urlEncoded
 	};
 	res.send(responseObject);
 }