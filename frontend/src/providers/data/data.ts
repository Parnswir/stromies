import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

const BASE = 'http://localhost:8080/v1';

const url = (strings, ...args) => BASE + strings.reduce((r, s, i) => r + encodeURIComponent(args[i - 1]) + s);
const getUserURL = userID => url`/user/${userID}`;

const subscribeToPromise = subscribable => new Promise((resolve, reject) => {
	subscribable.subscribe(resolve, reject);
});

@Injectable()
export class Data {

    constructor(public http: HttpClient) {
        console.log('Hello Data Provider');
    }

	getRemoteData(userID){
		const res = this.http.get(getUserURL(userID));
		return subscribeToPromise(res);
    }

	getActivities(userID, activities): any {
		const res = this.http.get(url`/user/${userID}/activities?metrics=${activities}`);
		return subscribeToPromise(res);
	}
}
