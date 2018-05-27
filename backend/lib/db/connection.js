'use strict';

const CONNECTION = process.env.DB_CONNECTION;
if(!CONNECTION) {
	console.error('missing DB_CONNECTION variable');
	process.exit(1);
}

module.exports = {
	type: CONNECTION.split(':', 1)[0],
	CONNECTION,
};
