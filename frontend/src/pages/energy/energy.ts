import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EnergyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-energy',
  templateUrl: 'energy.html',
})
export class EnergyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

	constructor(public navCtrl: NavController, public dataService: Data, public navParams: NavParams) {
	}

	async ionViewDidLoad() {
		const activity = await this.dataService.getActivities(0, this.navParams.get('activities'));
		const data = activity.queries[0].results[0].values.map(([x, y]) => ({x, y}));
		console.log(data);


		this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                datasets: [
                    {
                        label: this.navParams.get('activities'),
						backgroundColor: '#F00',
						borderColor: '#F00',
						fill: false,
						data: data,
                    }
                ]
            },
			options: {
				responsive: true,
				// title: {
				// 	display: true,
				// 	text: 'Chart.js Time Point Data'
				// },
				scales: {
					xAxes: [{
						type: 'time',
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						},
						ticks: {
							major: {
								fontStyle: 'bold',
								fontColor: '#FF0000'
							}
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'KWH'
						}
					}]
				}
			},
        });

    }

}
