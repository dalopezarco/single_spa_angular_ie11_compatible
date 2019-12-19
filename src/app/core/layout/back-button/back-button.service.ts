import { Injectable } from '@angular/core';
import { Router, Event, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfigurationService } from 'src/app/services/configuration/app-configuration.service';
import { IConfiguration } from 'src/app/models/configuration.model';
import { BackUrls } from 'src/app/monitoring/shared/app.constants';
@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  isLoginTried: boolean;

  constructor(private router: Router, private appConfig: AppConfigurationService) {}

  skipOuthTokenRoute() {
    window.history.go(-2);
  }

  handleOauthLogin(path) {
    this.appConfig.getConfiguration().subscribe((config: IConfiguration) => {
      if (this.isCurrentPathPresentInAngularUrls(config.YounifierURLs, path)) {
        this.skipOuthTokenRoute();
      } else {
        window.history.back();
      }
    });
  }

  handleAngularUrls(path) {
    this.appConfig.getConfiguration().subscribe((config: IConfiguration) => {
      if (this.isCurrentPathPresentInAngularUrls(config.YounifierURLs, path)) {
        this.navigateToAngularJSApp(BackUrls.settings);
      } else {
        window.history.back();
      }
    });
  }

  isCurrentPathPresentInAngularUrls(angularUrls, currentPath) {
    if (!angularUrls) {
      return false;
    }
    const angularUrlsArr = angularUrls.split(',');
    return angularUrlsArr.includes(currentPath);
  }

  navigateToUrl(backUrl) {
    window.location.href = backUrl;
  }

  navigateToAngularJSApp(backUrl) {
    window.history.back();
    setTimeout(() => {
      this.navigateToUrl(backUrl);
    }, 10);
  }

  getRouteNavigationError(): Observable<Event> {
    return this.router.events.pipe(filter((event: Event) => event instanceof NavigationError));
  }
}
