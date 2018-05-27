'use strict';

/* eslint-disable camelcase */

const fetch = require('node-fetch');

class KairosClient {
	constructor(url = process.env.KAIROS_URL, username = process.env.KAIROS_USER, password = process.env.KAIROS_PASSWORD) {
		this.url = url;
		this.headers = new fetch.Headers();
		this.headers.append('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`);
	}

	async getActivities(userId, from, to, metrics) {
		const query = {
			metrics: [],
			start_absolute: from,
			end_absolute: to,
		};
		for(const metric of metrics) {
			query.metrics.push({
				tags: {
					user: [userId],
				},
				name: `archive.consumption.${metric}`,
				aggregators: [
					{
						name: 'sum',
						sampling: {
							value: '1',
							unit: 'hours',
						},
					},
				],
			});
		}
		const response = await fetch(this.url, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(query),
		});
		const json = await response.json();
		return json;
	}
}

module.exports = KairosClient;
