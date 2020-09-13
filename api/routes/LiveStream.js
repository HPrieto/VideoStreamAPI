'use strict';

module.exports = (app) => {
	var controller = require('../controllers/LiveStream');
	
	app.route('/api/livestream/:userId/create')
		.post(controller.create);
	
	app.route('/api/livestream')
		.get(controllers.fetchAll);
	
	app.route('api/livestream/:streamId')
		.get(controllers.fetch);
	
	app.route('/api/livestream/:streamId/state')
		.get(controller.state);
};