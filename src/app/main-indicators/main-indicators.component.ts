import {Component} from 'angular2/core';
import {AppState} from '../app.service';

import {MainIndicator} from './main-indicator';

@Component({
  selector: 'main-indicators',
  styles: [require('./main-indicators.less')],
  template: require('./main-indicators.html')
})

export class MainIndicatorsComponent {
  mainIndicators: MainIndicator[];

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    this.mainIndicators = this.appState.get('selectedSummary').mainIndicators;
  }
}
