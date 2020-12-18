'use strict';

module.exports = (app) => {
	var controller = require('../controllers/User');

	app.route('/api/user')
		.get(controller.findAll)
		.delete(controller.deleteAll);

	app.route('/api/user/:id')
		.get(controller.findById)
		.delete(controller.deleteById);

	app.route('/api/user/username/:username')
		.get(controller.findByUsername);

	app.route('/api/user/signup')
		.post(controller.create);

	app.route('/api/user/login')
		.post(controller.login);

	app.route('/api/user/:id/preferred/:name')
		.put(controller.updatePreferredName);
		
	app.route('/api/user/:id/updatepassword')
		.put(controller.updatePasswordForUserWithId);
};