import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { SubSink } from 'subsink';
import { BackButtonService } from './back-button.service';
import { NavigationError } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';

@Component({
  selector: 'hrcb-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButtonComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(private location: Location, private backButtonService: BackButtonService, private authService: AuthorizationService) {}

  getCurrentPath() {
    return this.location.path();
  }

  goBack() {
    const currentPath = this.getCurrentPath();
    if (this.authService.isLoginTried) {
      this.backButtonService.handleOauthLogin(currentPath);
    } else {
      this.backButtonService.handleAngularUrls(currentPath);
    }
  }

  navigateToAngularJSApp(url) {
    this.backButtonService.navigateToAngularJSApp(url);
  }

  handleMissingRouteInAngular() {
    this.subs.add(
      this.backButtonService.getRouteNavigationError().subscribe((event: NavigationError) => {
        this.navigateToAngularJSApp(event.url);
      })
    );
  }

  ngOnInit() {
    this.handleMissingRouteInAngular();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
