import {Component} from 'angular2/core';
import {AppState} from '../app.service';

import {MainIndicatorsComponent} from '../main-indicators';
import {ChartComponent} from '../chart';

import {Report} from './report';

@Component({
  selector: 'reports',
  directives: [MainIndicatorsComponent, ChartComponent],
  styles: [require('./reports.less')],
  template: require('./reports.html')
})
export class ReportsComponent {
  reportsGroups: any;

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    let reports = this.appState.get('selectedSummary').reports;
    this.reportsGroups  = _.map(_.groupBy(reports, (report: Report) => report.group), (groupReports, group) => {
      return {
        number: group,
        reports: _.sortBy(groupReports, 'sort')
      };
    });
  }
}
