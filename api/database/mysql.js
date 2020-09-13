'use strict';

const mysql = require('mysql');

const deployed = false;

var connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

if (deployed) {
	// production config
	/*
	let productionConfig = {
    	user: process.env.MYSQL_USER,
    	database: process.env.MYSQL_DATABASE,
    	password: process.env.MYSQL_PASSWORD,
	}
	if (process.env.MYSQL_INSTANCE_NAME && process.env.NODE_ENV === 'production') {
  		productionConfig.socketPath = `/cloudsql/${process.env.MYSQL_INSTANCE_NAME}`;
	}
	connection = mysql.createConnection(productionConfig);
	*/
} else {
	// development config
	/*
	connection = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	});
	*/
}

connection.connect((err) => {
	if (err) {
		console.log(`Error connection: ${err.stack}`);
		console.log('Make sure MySQL is ON.');
		return;
	}
	console.log(`MySQL connected as thread: ${connection.threadId}`);
});

module.exports = connection;