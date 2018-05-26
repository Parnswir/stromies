'use strict';

const express = require('express');
const routes = require('./routes');

const PORT = 8080;

const app = express();

app.use('/v1', routes);

app.listen(PORT, () => {
	console.log('backend is running...');
});
