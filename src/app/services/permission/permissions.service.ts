import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Permission } from 'src/app/monitoring/shared/user-info.model';
import { AppConfigurationService } from '../configuration/app-configuration.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { UmsRoutes } from 'src/app/monitoring/shared/app.constants';


@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private userPermissions: Permission[];
  private baseUrl: string;
  constructor(private http: HttpClient, private appConfig: AppConfigurationService, private authService: AuthorizationService) {
    this.setBaseUrl();
  }

  getUserPermissions() {
    return this.getBaseUrl().pipe(
      mergeMap(baseUrl => {
        const requestUrl = baseUrl + UmsRoutes.userPermissions.replace('{uid}', this.authService.getDecodedToken());
        return this.http.get<Permission[]>(requestUrl);
      }),
    );
  }

  isValidUserPermission(roleBasedPermissions): boolean {
    const validUserPermissions = [];
    this.userPermissions.forEach(userPermission =>
      roleBasedPermissions.forEach(permisssion => {
        if (userPermission.ShortName.toLowerCase() === permisssion.toLowerCase()) {
          validUserPermissions.push(userPermission.ShortName);
        }
      }),
    );
    return validUserPermissions.length > 0 ? true : false;
  }

  hasPermission(roleBasedPermissions: string[]): Observable<boolean> {
    if (roleBasedPermissions && roleBasedPermissions.length === 0) {
      return of(false);
    }

    if (this.isUserPermissionAvailable()) {
      return of(this.isValidUserPermission(roleBasedPermissions));
    } else {
      return this.getUserPermissions().pipe(
        map(userPermissions => {
          this.userPermissions = userPermissions;
          return this.isValidUserPermission(roleBasedPermissions);
        }),
        catchError(err => {
          return of(false);
        }),
      );
    }
  }

  isUserPermissionAvailable(): boolean {
    return this.userPermissions && this.userPermissions.length > 0;
  }

  getBaseUrl(): Observable<string> {
    return this.getGraphToggleValue().pipe(
      mergeMap(toggleValue => {
        return toggleValue === 'true'
          ? this.appConfig.getConfiguration().pipe(map(configurations => configurations.endpoints.apiUmsQuerymodel))
          : this.appConfig.getConfiguration().pipe(map(configurations => configurations.endpoints.apiUms));
      }),
    );
  }

  getGraphToggleValue(): Observable<string> {
    const url = this.baseUrl + UmsRoutes.settingsGraphToggle;
    return this.http.get<string>(url);
  }

  private setBaseUrl() {
    this.appConfig.getConfiguration().subscribe(config => (this.baseUrl = config.endpoints.apiUms));
  }
}
