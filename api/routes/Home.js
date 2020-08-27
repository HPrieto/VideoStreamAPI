'use strict';

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.send('<h1>Hello World!</h1>');
	});
};