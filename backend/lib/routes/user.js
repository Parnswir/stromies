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

router.get('/user/:userID/activities', async ctx => {
	const {userID} = ctx.params;
	const user = await User.get(userID);

	const from = ctx.query.from || 1483225200000;
	const to = ctx.query.to || 1485903600000;
	const metrics = (ctx.query.metrics || 'electricity').split(',');

	ctx.body = await new KairosClient().getActivities(userID, from, to, metrics);
});
