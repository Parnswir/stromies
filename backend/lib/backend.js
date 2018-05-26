'use strict';

const Koa = require('koa');
const routes = require('./routes');
const formatter = require('./formatter');

const PORT = 8080;

const app = new Koa();

const BASE_ERROR = {
	error: '',
	name: '',
};

app.use(formatter);
app.use(async (ctx, next) => {
	await next();
	if(ctx.body === undefined && !ctx.headerSent) {
		ctx.code = 404;
		ctx.body = {
			error: `Unknwon route ${ctx.path}`,
			name: 'NotFound',
			path: ctx.path,
		};
	}
});
app.use(async (ctx, next) => {
	try {
		await next();
	} catch(err) {
		ctx.body = {
			...BASE_ERROR,
			...err,
			error: err.message,
			name: err.name,
		};
	}
});
app.use(routes.routes());

app.listen(PORT, () => {
	console.log('backend is running...');
});
