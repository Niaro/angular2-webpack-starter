import {Component, Input} from 'angular2/core';
import {AppState} from '../app.service';

import {Report} from '../reports/report';
import {Chart} from './chart';

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
  constructor(public appState: AppState) {

  }

  ngOnChanges() {
    let isTimed = _.has(this.report.values, 'year');

    this.chartData = {
      unit: this.report.unit,
      axisDataes: isTimed ? this.report.values['year'] : this.report.values
    };
  }

  ngOnInit() {

  }
}
