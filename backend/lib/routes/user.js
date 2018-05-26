'use strict';

const {User} = require('../models');
const router = require('.');

router.get('/user/:userID', async ctx => {
	const {userID} = ctx.params;
	const user = await User.getOrCreate(userID);
	ctx.body = user;
});
