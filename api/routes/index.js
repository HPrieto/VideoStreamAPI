module.exports = (app) => {
	require('./User')(app);
	require('./ChatRoom')(app);
};