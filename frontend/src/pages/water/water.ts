import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data'
import { Chart } from 'chart.js';

/**
 * Generated class for the WaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-water',
  templateUrl: 'water.html',
})
export class WaterPage {
	@ViewChild('lineCanvas') lineCanvas;

	lineChart: any;


  constructor(public navCtrl: NavController, public dataService: Data) {
  }

  async ionViewDidLoad() {
	  const activity = await this.dataService.getActivities(0, 'water');
	  const data = activity.queries[0].results[0].values.map(([x, y]) => ({x:x-23200000, y}));
	  console.log(data);


	  this.lineChart = new Chart(this.lineCanvas.nativeElement, {

		  type: 'line',
		  data: {
			  datasets: [
				  {
					  label: 'water',
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
						  labelString: 'Liters/min'
					  }
				  }]
			  }
		  },
	  });

  }

}
