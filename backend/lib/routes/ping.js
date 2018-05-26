'use strict';

const router = require('.');

router.get('/ping', (req, res) => {
	res.send('pong\n');
});
