require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setup routes
require('./api/routes')(app);

app.listen(port, () => {
	console.log(`api listening on port: ${port}`);
});