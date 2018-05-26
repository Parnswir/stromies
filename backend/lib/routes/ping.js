'use strict';

const router = require('.');

router.get('/ping', ctx => {
	ctx.body = 'pong';
});
