module.exports = (app) => {
	require('./Home')(app);
	require('./User')(app);
};