'use strict';

module.exports = (app) => {
	
	var controller = require('../controllers/Home');
	
	app.get('/', (req, res) => {
		res.send('<h1>Hello World!</h1>');
	});
	
	app.route('/gendate')
		.get(controller.generateDate);
	
	app.route('/gendate/day/:day/month/:month/year/:year')
		.get(controller.generateDMY);
};