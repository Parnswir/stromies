import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data'
import { Chart } from 'chart.js';

/**
 * Generated class for the CoinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coins',
  templateUrl: 'coins.html',
})
export class CoinsPage {

	@ViewChild('lineCanvas') lineCanvas;

	lineChart: any;

  constructor(public navCtrl: NavController, public dataService: Data) {
  }

  async ionViewDidLoad() {
	  const activity = await this.dataService.getActivitiesMonth(1, 'ecoins');
	  const data = activity.queries[0].results[0].values.map(([x, y]) => ({x, y}));
	  console.log(data);


	  this.lineChart = new Chart(this.lineCanvas.nativeElement, {

		  type: 'line',
		  data: {
			  datasets: [
				  {
					  label: 'coins',
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
						  labelString: 'ECOins'
					  }
				  }]
			  }
		  },
	  });

  }

}
