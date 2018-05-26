'use strict';

const Router = require('koa-router');
const koaBody = require('koa-body');

const router = new Router({
	prefix: '/v1',
});
module.exports = router;

router.bodyParser = koaBody();

require('./ping');
require('./user');
