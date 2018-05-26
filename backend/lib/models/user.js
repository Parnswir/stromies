'use strict';

const Model = require('../model');

class User extends Model {
}

User.inititalValues = {
	firstname: 'New',
	lastname: 'User',
};

module.exports = User;
