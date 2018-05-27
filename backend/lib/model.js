'use strict';

const db = require('./db');

class Model {
	constructor(data) {
		Object.assign(this, data);
	}

	async save() {
		await db.set(this.constructor.model, this.id, this);
	}

	update(data) {
		for(const key of Object.keys(this)) {
			if(data.hasOwnProperty(key))
				this[key] = data[key];
		}
		return this;
	}

	static get model() {
		return this.name[0].toLowerCase() + this.name.slice(1);
	}

	static async get(id) {
		const data = await db.get(this.model, id);
		return this.create(id).update(data);
	}

	static create(id) {
		return new this({
			id,
			...this.inititalValues,
		});
	}
}

module.exports = Model;
