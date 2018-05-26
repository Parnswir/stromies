'use strict';

const formatter = Object.create(null);
formatter.json = data => `${JSON.stringify(data)}\n`;
formatter.pretty = data => `${JSON.stringify(data, null, '\t')}\n`;

module.exports = async (ctx, next) => {
	let applyFormat = formatter[ctx.query.format];
	if(applyFormat === undefined)
		applyFormat = formatter.pretty;

	await next();

	if(!Buffer.isBuffer(ctx.body))
		ctx.body = Buffer.from(applyFormat(ctx.body));
};
