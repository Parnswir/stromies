import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GasPage} from '../gas/gas';
import {EnergyPage} from '../energy/energy';
import {ActivitiesPage} from '../activities/activities';
import {RewardsPage} from '../rewards/rewards';
import {EventsPage} from '../events/events';
import { Data } from '../../providers/data/data';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController, public dataService: Data) {

	}

	ionViewDidLoad(){
		this.dataService.getRemoteData(0);
	}

    gasPage(){
      this.navCtrl.push(GasPage);
    }
    energyPage(){
      this.navCtrl.push(EnergyPage);
    }
    activitiesPage(){
      this.navCtrl.push(ActivitiesPage);
    }
    rewardsPage(){
      this.navCtrl.push(RewardsPage);
    }
    eventsPage(){
      this.navCtrl.push(EventsPage);
    }


  }
