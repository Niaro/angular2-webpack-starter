import {Component, Input} from 'angular2/core';
import {AppState} from '../app.service';

import {Report} from '../reports/report';
import {Chart, ChartTime} from './chart';

import {BarVComponent} from './bar-v';

@Component({
  selector: 'chart',
  styles: [require('./chart.less')],
  directives: [BarVComponent],
  template: require('./chart.html')
})

export class ChartComponent {
  @Input('src')
  report: Report;
  chartData: Chart;
  chartTime: ChartTime = ChartTime.year;
  isTimed: boolean = false;

  constructor(public appState: AppState) {

  }

  ngOnChanges() {
    this.isTimed = _.has(this.report.values, ChartTime.year);
    this.chartData = this.isTimed ? this.getChartData(this.chartTime) : this.getChartData();
  }

  switchTime(chartTime: ChartTime) {
    this.chartTime = chartTime;
    this.chartData = this.getChartData(chartTime);
  }

  getChartData(chartTime?: ChartTime) {
    return {
      unit: this.report.unit,
      axisDataes: chartTime ? this.report.values[chartTime] : this.report.values
    };
  }

  ngOnInit() {

  }
}
