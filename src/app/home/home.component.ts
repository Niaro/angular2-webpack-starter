import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {RouteConfig, RouterOutlet, ComponentInstruction, OnActivate} from 'angular2/router';

import {ReportsComponent} from '../reports';

@Component({
  selector: 'home',
  providers: [],
  directives: [RouterOutlet],
  styles: [require('./home.less')],
  template: require('./home.html')
})
@RouteConfig([
  { path: '/', name: 'Reports', component: ReportsComponent, useAsDefault: true },
])
export class HomeComponent implements OnActivate {
  constructor(public appState: AppState) {}

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    let fetchDataPromise = require(`es6-promise!assets/data/${next.routeName.toLowerCase()}.json`)();
    fetchDataPromise.then(json => {
      this.appState.set('selectedSummary', json);
    });
    return fetchDataPromise;
  }
}
