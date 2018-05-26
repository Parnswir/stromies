'use strict';

const {promisify} = require('util');

const util = module.exports = {};

util.wait = promisify(setTimeout);
util.nextTick = promisify(process.nextTick);
