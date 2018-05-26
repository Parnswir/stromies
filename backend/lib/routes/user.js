'use strict';

const {User} = require('../models');
const router = require('.');
const KairosClient = require('../kairos')

router.get('/user/:userID', async ctx => {
	const {userID} = ctx.params;
	const user = await User.getOrCreate(userID);
	ctx.body = user;
});

router.get('/user/:userID/activities', async ctx => {
  const {userID} = ctx.params;
  const user = await User.get(userID);

  const from = ctx.query['from'] || 1483225200000
  const to = ctx.query['to'] || 1485903600000
  const metrics = (ctx.query['metrics'] || 'electricity').split(',')

  ctx.body = await new KairosClient().getActivities(userID, from, to, metrics);
});
