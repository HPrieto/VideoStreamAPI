'use strict';

module.exports = (app) => {
	var controller = require('../../controllers/Wowza/LiveStreams');
	
	app.route('/api/live_streams')
		.post(controller.create)
		.get(controller.fetchAll);
	
	app.route('/api/live_streams/:id')
		.get(controller.fetchById)
		.patch(controller.update)
		.delete(controller.delete);
	
	app.route('/api/live_streams/:id/start')
		.put(controller.start);
	
	app.route('/api/live_streams/:id/stop')
		.put(controller.stop);
		
	app.route('/api/live_streams/:id/reset')
		.put(controller.reset);
	
	app.route('/api/live_streams/:id/regenerate_connection_code')
		.put(controller.regenerate);
	
	app.route('/api/live_streams/:id/thumbnail_url')
		.get(controller.fetchThumbnail);
	
	app.route('/api/live_streams/:id/state')
		.get(controller.fetchState);
	
	app.route('/api/live_streams/:id/stats')
		.get(controller.fetchStats);
		
};