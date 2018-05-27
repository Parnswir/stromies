import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {GasPage} from '../gas/gas';
import {EnergyPage} from '../energy/energy';
import {ActivitiesPage} from '../activities/activities';
import {RewardsPage} from '../rewards/rewards';
import {EventsPage} from '../events/events';
import {PopoverComponent} from '../../components/popover/popover';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {}
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

    presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
    }

    popover.onDidDismiss(popoverData => {
      console.log(popoverData);
    });

  }
