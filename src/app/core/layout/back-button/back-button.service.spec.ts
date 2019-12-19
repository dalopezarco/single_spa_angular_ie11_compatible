import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterTestingModule } from '@angular/router/testing';
import { BackButtonService } from './back-button.service';
import { of } from 'rxjs';
import { AppConfigurationService } from 'src/app/services/configuration/app-configuration.service';

describe('BackButtonService', () => {
  let service: BackButtonService;
  let appConfig: AppConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OAuthModule.forRoot(), RouterTestingModule],
      providers: [AppConfigurationService]
    });

    service = TestBed.get(BackButtonService);
    appConfig = TestBed.get(AppConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handling OAuth login for back button when oAuth-service tryLogin() is called', () => {
    let mockConfig;
    beforeEach(() => {
      mockConfig = { angularUrls: '/settings/maritalstatus, /employees' };
      spyOn(appConfig, 'getConfiguration').and.returnValue(of(mockConfig));
      spyOn(window.history, 'back');
      spyOn(window.history, 'go');
    });

    it('should navigate to settings/system page, if the current page is a system settings list page', () => {
      const currentPath = '/settings/maritalstatus';

      service.handleOauthLogin(currentPath);

      expect(window.history.go).toHaveBeenCalledTimes(1);
      expect(window.history.go).toHaveBeenCalledWith(-2);
    });

    it('should not navigate to settings/system page, if the current page is not a system settings list page', () => {
      const currentPath = '/employees';

      service.handleOauthLogin(currentPath);

      expect(window.history.go).toHaveBeenCalledTimes(0);
      expect(window.history.back).toHaveBeenCalledTimes(1);
    });
  });

  describe('handling OAuth login for back button when oAuth-service tryLogin() is not called', () => {
    let mockConfig;
    beforeEach(() => {
      mockConfig = { angularUrls: '/settings/maritalstatus' };
      spyOn(appConfig, 'getConfiguration').and.returnValue(of(mockConfig));
      spyOn(service, 'navigateToAngularJSApp');
      spyOn(window.history, 'back');
    });

    it('should navigate to settings/system page, if the current page is a system settings list page', () => {
      const currentPath = '/settings/maritalstatus';

      service.handleAngularUrls(currentPath);

      expect(service.navigateToAngularJSApp).toHaveBeenCalledTimes(1);
      expect(service.navigateToAngularJSApp).toHaveBeenCalledWith('/settings/system');
    });

    it('should not navigate to settings/system page, if the current page is not a system settings list page', () => {
      const currentPath = '/employees';

      service.handleAngularUrls(currentPath);

      expect(service.navigateToAngularJSApp).toHaveBeenCalledTimes(0);
      expect(window.history.back).toHaveBeenCalledTimes(1);
    });
  });
});
