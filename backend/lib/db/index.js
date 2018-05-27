'use strict';

const {type} = require('./connection');

const VALID_TYPES = ['redis'];

if(!VALID_TYPES.includes(type)) {
	console.error(`Invalid connection type: ${type}`);
	process.exit(1);
}

module.exports = require(`./${type}`);
