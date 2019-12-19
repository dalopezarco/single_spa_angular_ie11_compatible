import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { AppConfigurationService } from '../configuration/app-configuration.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { tap } from 'rxjs/operators';
import { UserInfo } from 'src/app/monitoring/shared/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUri: string;
  private baseUrl: string;
  private token: string;
  user: BehaviorSubject<any>;

  constructor(
    private readonly http: HttpClient,
    private appConfigService: AppConfigurationService,
    private authServiceService: AuthorizationService,
  ) {
    this.apiUri = 'api/users';
    this.setBaseUrl();
    this.user = new BehaviorSubject(null);
  }

  getUserDetails(): Observable<any> {
    this.token = this.authServiceService.getDecodedToken();
    const url = this.baseUrl + '?uid=' + this.token;
    return this.http.get(url).pipe(
      tap(resp => {
        this.user.next(resp.DisplayName);
      }),
    );
  }

  private setBaseUrl() {
    this.appConfigService.getConfiguration().subscribe(config => (this.baseUrl = config.endpoints.apiUms + '/' + this.apiUri));
  }

  getUserName() {
    return this.user.value;
  }

  // getLoggeduserHasPermission(permission: string): ng.IPromise<boolean> {
  //   const loggedUserUId = this.getLoggedUserUId();
  //   return this.getUserHasPermission(loggedUserUId, permission);
  // }

  // private getLoggedUserUId(): string {
  //   const LoggedUserUId = this.authServiceService.getUserInfo().uid;
  //   if (LoggedUserUId == null) {
  //     return null;
  //   }

  //   return LoggedUserUId;
  // }
}
