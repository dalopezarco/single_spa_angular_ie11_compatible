import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { AuthConfig } from 'angular-oauth2-oidc';
import { IConfiguration } from 'src/app/models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {
  config$: Observable<IConfiguration> = null;

  constructor(private http: HttpClient) {}

  init(): Promise<IConfiguration> {
    return this.getConfiguration().toPromise();
  }

  getConfiguration(): Observable<IConfiguration> {
    if (!this.config$) {
      this.config$ = this.http.get<IConfiguration>(`https://yfo-pegasus-test.azurewebsites.net/setup`).pipe(shareReplay(1));
    }

    return this.config$;
  }

  getoAuthConfig(): AuthConfig {
    const authConfig = {
      clientId: 'Implicit',
      loginUrl: ''
    } as AuthConfig;
    return authConfig;
  }
}
