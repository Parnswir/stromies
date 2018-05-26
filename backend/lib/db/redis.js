'use strict';

const Redis = require('ioredis');

const {CONNECTION} = require('./connection');

const redis = new Redis(CONNECTION);

const db = module.exports = {};

const getKey = (model, id) => `${model}:${id}`;

db.get = (model, id) => redis.hgetall(getKey(model, id));

db.set = (model, id, data) => redis.hmset(getKey(model, id), data);

db.remove = (model, id) => redis.del(getKey(model, id));
