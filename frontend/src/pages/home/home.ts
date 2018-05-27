import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {GasPage} from '../gas/gas';
import {EnergyPage} from '../energy/energy';
import {ActivitiesPage} from '../activities/activities';
import {RewardsPage} from '../rewards/rewards';
import {EventsPage} from '../events/events';
import {CoinsPage} from '../coins/coins';
import {DivRank} from '../div-rank/div-rank';
import {ComRank} from '../com-rank/com-rank';
import {WaterPage} from '../water/water';

import {PopoverComponent} from '../../components/popover/popover';
import { Data } from '../../providers/data/data';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {


	constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public dataService: Data) {}

	ionViewDidLoad(){
		this.dataService.getRemoteData(1);
	}
	contactPage(){
		this.navCtrl.push(EventsPage);
	}
	coinPage(){
		this.navCtrl.push(CoinsPage);
	}
	divRankPage(){
		this.navCtrl.push(DivRank);
	}
	comRankPage(){
		this.navCtrl.push(ComRank);
	}
    gasPage(){
      this.navCtrl.push(WaterPage);
    }
    energyPage(){
      this.navCtrl.push(EnergyPage);
    }
    activitiesPage(){
      this.navCtrl.push(WaterPage);
    }
    rewardsPage(){
      this.navCtrl.push(RewardsPage);
    }
    eventsPage(){
      this.navCtrl.push(EventsPage);
    }

    presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      console.log(popoverData);
    });

    }

  }
