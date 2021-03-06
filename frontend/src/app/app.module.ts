import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GasPage } from '../pages/gas/gas';
import {EnergyPage} from '../pages/energy/energy';
import {ActivitiesPage} from '../pages/activities/activities';
import {RewardsPage} from '../pages/rewards/rewards';
import {EventsPage} from '../pages/events/events';
import {PopoverComponent} from '../components/popover/popover';
import { Data } from '../providers/data/data';
import { WaterPage } from '../pages/water/water';
import {CoinsPage} from '../pages/coins/coins';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GasPage,
    EnergyPage,
    ActivitiesPage,
    RewardsPage,
    EventsPage,
    PopoverComponent,
	WaterPage,
	CoinsPage,
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GasPage,
    EnergyPage,
    ActivitiesPage,
    RewardsPage,
    EventsPage,
    PopoverComponent,
	WaterPage,
	CoinsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Data
  ]
})
export class AppModule {}
