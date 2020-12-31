'use strict';

module.exports = (app) => {
	var controller = require('../controllers/User');

	app.route('/api/users')
		.get(controller.findAll)
		.delete(controller.deleteAll);

	app.route('/api/users/:id')
		.get(controller.findById)
		.delete(controller.deleteById);

	app.route('/api/users/username/:username')
		.get(controller.findByUsername);
		
	app.route('/api/users/username/:username/available')
		.get(controller.isUsernameAvailable);

	app.route('/api/users/signup')
		.post(controller.create);

	app.route('/api/users/login')
		.put(controller.login);
		
	app.route('/api/users/:id/update/password')
		.put(controller.updatePasswordForUserWithId);
		
	// Followers
	
	app.route('/api/users/:userId/followers')
		.get(controller.findFollowersByUserId);
	
	app.route('/api/users/:followerId/following')
		.get(controller.findFollowersByFollowerId);
		
	app.route('/api/users/:followerId/follow/:userId')
		.post(controller.follow);
	
	app.route('/api/users/:followerId/unfollow/:userId')
		.delete(controller.unfollow);
};