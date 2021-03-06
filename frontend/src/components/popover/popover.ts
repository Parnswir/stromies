import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  items: any;
  text: string;

  constructor(public viewCtrl: ViewController) {
    this.items = [
      {item: 'Edit personal data'},
      {item: 'Settings'},
      {item: 'About'}
    ];
  }

  itemClick(item) {
    this.viewCtrl.dismiss(item);
  }
}
