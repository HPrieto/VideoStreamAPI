const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt.js');

const User = require('../models/User');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ username: 'email' }, (email, password, done) => {
			User.findByEmail(email, (err, user) => {
				if (err) throw err;
				if (!user)
					return done(null, false, { message: 'The email is not registered.' });
				
				User.matching(password, user.password, (isMatching) => {
					if (isMatching)
						return done(null, user);
					else
						return done(null, false, { message: 'Password is incorrect.' });
				});
				
			});
		})
	);
}

passport.serializeUser = (user, done) => {
	done(null, user.id);
};

passport.deserializeUser = (id, done) => {
	User.findById(id, (error, user) => {
		done(err, user);
	});
};