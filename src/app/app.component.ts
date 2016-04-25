/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, ElementRef, Renderer} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AppState} from './app.service';

import {RouterActive} from './router-active';
import {HomeComponent} from './home';
import {EmptyComponent} from './empty';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [ROUTER_DIRECTIVES, RouterActive],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.less')],
  template: require('./app.html')
})

@RouteConfig([
  { path: '/', name: 'Empty', component: EmptyComponent, useAsDefault: true },
  {
    path: '/retail/...',
    name: 'Retail',
    component: HomeComponent,
  },
  {
    path: '/production/...',
    name: 'Production',
    component: HomeComponent,
  },
  {
    path: '/distribution/...',
    name: 'Distribution',
    component: HomeComponent,
  },
])

export class App {

  // TypeScript public modifiers
  constructor(public appState: AppState, public router: Router, private _element: ElementRef, private _renderer: Renderer) {
    _renderer.setElementClass(_element.nativeElement, 'initializing', true);
  }

  ngOnInit() {
    this._renderer.setElementClass(this._element.nativeElement, 'initializing', false);
    this._renderer.setElementClass(this._element.nativeElement, 'initialized', true);
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
