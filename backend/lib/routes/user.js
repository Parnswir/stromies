'use strict';

const {User} = require('../models');
const router = require('.');
const {bodyParser} = router;
const KairosClient = require('../kairos');

router.get('/user/:userID', async ctx => {
	const {userID} = ctx.params;
	const user = await User.get(userID);
	console.log('USER', user);
	ctx.body = user;
});

router.post('/user/:userID', bodyParser, async ctx => {
	const {userID} = ctx.params;
	console.log(userID, ctx.request.body);
	const user = await User.get(userID);
	console.log(user);
	await user.update(ctx.request.body).save();
});

// 2017-01-01 to 2017-02-01
const FROM_DEFAULT = 1483225200000;
const TO_DEFAULT = 1485903600000;

router.get('/user/:userID/activities', async ctx => {
	const {userID} = ctx.params;

	const from = ctx.query.from || FROM_DEFAULT;
	const to = ctx.query.to || TO_DEFAULT;
	const metrics = (ctx.query.metrics || 'electricity').split(',');

	ctx.body = await new KairosClient().getActivities(userID, from, to, metrics);
});
