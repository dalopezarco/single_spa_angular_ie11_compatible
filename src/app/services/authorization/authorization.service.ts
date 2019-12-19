import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AppConfigurationService } from '../configuration/app-configuration.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isLoginTried: boolean;
  private logoutUrl = '';

  constructor(private oAuthService: OAuthService, private configService: AppConfigurationService, private location: Location) {
    this.init();
  }

  private init() {
    this.isLoginTried = false;

    this.getAllConfigurations().subscribe(config => {
      this.oAuthService.configure(config);
      this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
      this.oAuthService.tryLogin().then(status => {
        this.isLoginTried = status;
      });
      this.logoutUrl = config.logoutUrl;
    });
  }

  private getCurrentUurl(): string {
    const port = window.location.port ? ':' + window.location.port : '';
    const hostUrl = window.location.href;
    return hostUrl;
  }

  private getAllConfigurations(): Observable<AuthConfig> {
    const port = window.location.port ? ':' + window.location.port : '';
    const hostUrl = window.location.protocol + '//' + window.location.hostname + port + '/';
    const configs = this.configService.getConfiguration().pipe(
      map(config => {
        return {
          loginUrl: config.identityBrokerUrl + '/as/authorization.oauth2',
          redirectUri: hostUrl,
          clientId: 'Implicit',
          scope: '',
          strictDiscoveryDocumentValidation: false,
          responseType: 'token',
          oidc: false,
          logoutUrl: config.identityBrokerUrl + '/idp/startSLO.ping'
        } as AuthConfig;
      })
    );
    return configs;
  }

  hasValidToken(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  login(): void {
    const redirectUrl = this.getCurrentUurl();
    this.oAuthService.redirectUri = redirectUrl;
    this.oAuthService.initImplicitFlow();
  }

  logout(): void {
    this.oAuthService.logOut();
    this.navigateToUrl(this.logoutUrl);
  }

  navigateToUrl(url) {
    window.location.href = url;
  }

  setState(state: string): void {
    this.oAuthService.state = state;
  }

  getAccessToken(): string {
    return this.oAuthService.getAccessToken();
  }

  getDecodedToken(): string {
    if (this.oAuthService.hasValidAccessToken()) {
      const token = this.oAuthService.getAccessToken();

      try {
        const uid = jwt_decode(token).uid;
        window.localStorage.setItem('uid', uid);
        return uid;
      } catch {
        return null;
      }
    }
  }
}
