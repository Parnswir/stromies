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
		const ts = Math.round((new Date(2017,1,15)).getTime()  ) + 43200000;
		const ts_end = Math.round((new Date(2017,1,16)).getTime() ) + 23200000;

		const res = this.http.get(url`/user/${userID}/activityDetails?metrics=${activities}&from=${ts}&to=${ts_end}`);
		return subscribeToPromise(res);
	}

	getActivitiesMonth(userID, activities): any {
		const res = this.http.get(url`/user/${userID}/activities?metrics=${activities}`);
		return subscribeToPromise(res);
	}


}
