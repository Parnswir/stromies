'use strict';

const Router = require('koa-router');

const router = new Router({
	prefix: '/v1',
});
module.exports = router;

require('./ping');
require('./user');
