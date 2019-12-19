import { Injectable } from '@angular/core';
import { AppConfigurationService } from '../configuration/app-configuration.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  userLanguage: string;
  constructor(private http: HttpClient, private appConfig: AppConfigurationService, private translate: TranslateService) {}

  getDefaultLanguage(): Observable<string> {
    return this.appConfig.getConfiguration().pipe(map(config => config.userLanguage));
  }

  fetchTranslations(lang: string): Observable<any> {
    return this.appConfig
      .getConfiguration()
      .pipe(mergeMap(config => this.http.get<any>(config.endpoints.apiDomain + '/api/translation?lang=' + lang)));
  }

  setTranslations(): Observable<any> {
    const translations$ = this.appConfig.getConfiguration().pipe(
      tap(config => {
        this.userLanguage = config.userLanguage;
      }),
      mergeMap(config => {
        this.translate.addLangs(['en-US', 'nl-NL', 'fr-FR', 'de-DE', 'es-ES']);
        this.translate.setDefaultLang(config.userLanguage);
        return this.fetchTranslations(config.userLanguage);
      }),
      catchError(err => throwError(err))
    );
    return translations$.pipe(
      map(translations => {
        this.translate.setTranslation(this.translate.getDefaultLang(), translations);
      })
    );
  }

  getTranslations(translationKeys: string[]): Observable<string> {
    return this.translate.get(translationKeys);
  }

  getTranslation(key: string): Observable<string> {
    return this.translate.get(key, null);
  }

  getTranslationWithParams(key: string, params: Object): string {
    return this.translate.instant(key, params);
  }
}
