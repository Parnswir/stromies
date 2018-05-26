'use strict';

const {nextTick} = require('./util');

class Model {
	constructor(data) {
		Object.assign(this, data);
	}

	static async get(id) {
		console.warn(`${this.name}.get(${id}) not implemented`);
		await nextTick();
		return null;
	}

	static create(id) {
		return new this({
			id,
			...this.inititalValues,
		});
	}

	static async getOrCreate(id) {
		const user = await this.get(id);
		return user === null ? this.create(id) : user;
	}
}

module.exports = Model;
