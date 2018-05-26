import { Component } from '@angular/core';

import { ActivitiesPage } from '../activities/activities';
import { EventsPage } from '../events/events';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ActivitiesPage;
  tab3Root = EventsPage;

  constructor() {

  }
}
