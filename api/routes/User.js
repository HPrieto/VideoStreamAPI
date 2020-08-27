'use strict';

module.exports = (app) => {
	var controller = require('../controllers/User');

	app.route('/api/user')
		.get(controller.getAll)
		.delete(controller.deleteAll);

	app.route('/api/user/:id')
		.get(controller.getById)
		.delete(controller.deleteById);

	app.route('/api/user/username/:username')
		.get(controller.getByUsername);

	app.route('/api/user/signup')
		.post(controller.create);

	app.route('/api/user/login')
		.post(controller.login);

	app.route('/api/user/:id/preferred/:name')
		.put(controller.updatePreferredName);
};