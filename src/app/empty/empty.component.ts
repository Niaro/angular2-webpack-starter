import {Component} from 'angular2/core';
import {ComponentInstruction, OnActivate, OnDeactivate } from 'angular2/router';

import {AppState} from '../app.service';

@Component({
  template: ''
})

export class EmptyComponent implements OnActivate, OnDeactivate {
  constructor(private appState: AppState) { }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    this.appState.set('selectedSummary', undefined);
  }

  routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    this.appState.set('selectedSummary', {});
  }
}
