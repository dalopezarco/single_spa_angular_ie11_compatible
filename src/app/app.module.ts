import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './core/layout/layout.component';
import { MainMenuComponent } from './core/layout/main-menu/main-menu.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { BackButtonComponent } from './core/layout/back-button/back-button.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitoringDetailComponent } from './monitoring-detail/monitoring-detail.component';
import { FilterBarComponent } from './common/filter-bar/filter-bar.component';
import { YfoTimelineComponent } from './common/yfo-timeline/yfo-timeline.component';
import { YfoTimelineIconComponent } from './common/yfo-timeline-icon/yfo-timeline-icon.component';
import { ShowComponent } from './common/show/show.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ZoomPageTemplateModule } from '@zoomui/page-template';
import { ZoomMenuModule } from '@zoomui/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TranslateModule, MissingTranslationHandler, TranslateParser } from '@ngx-translate/core';
import { ZoomTableModule } from '@zoomui/table';
import { ZoomFormModule } from '@zoomui/form';
import { ZoomWhiteLabelingModule } from '@zoomui/white-labeling';
import { ZoomButtonModule } from '@zoomui/button';
import { ZoomLoadingModule } from '@zoomui/loading';
import { ZoomNotificationModule } from '@zoomui/notification';
import { ZoomOutputModule } from '@zoomui/output';
import { ZoomPopoverModule } from '@zoomui/popover';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyMissingTranslationHandler, CustomParser, initTranslations } from './services/translation/translation.module';
import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { AppConfigurationService } from './services/configuration/app-configuration.service';
import { TranslationService } from './services/translation/translation.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { MonitoringService } from './monitoring/shared/monitoring.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import locateEs from '@angular/common/locales/es';
import locateNl from '@angular/common/locales/nl';
import locateZh from '@angular/common/locales/zh';
// import locateZhHans from '@angular/common/locales/zh-hans';
import locateFr from '@angular/common/locales/fr';
import locateDe from '@angular/common/locales/de';
import { ZoomDatePickerModule } from '@zoomui/date-picker';
import { AssetUrlPipe } from './core/pipes/assetUrl/asset-url.pipe';

registerLocaleData(locateEs);
registerLocaleData(locateNl);
registerLocaleData(locateZh);
// registerLocaleData(locateZhHans);
registerLocaleData(locateFr);
registerLocaleData(locateDe);

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    MonitoringComponent,
    MonitoringDetailComponent,
    FilterBarComponent,
    LayoutComponent,
    MainMenuComponent,
    HeaderComponent,
    FooterComponent,
    BackButtonComponent,
    YfoTimelineComponent,
    YfoTimelineIconComponent,
    ShowComponent,
    AssetUrlPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ZoomPageTemplateModule,
    ZoomTableModule,
    ZoomFormModule,
    ZoomWhiteLabelingModule,
    ZoomButtonModule,
    ZoomMenuModule,
    ZoomLoadingModule,
    ZoomNotificationModule,
    ZoomDatePickerModule,
    ZoomOutputModule,
    ZoomPopoverModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    OAuthModule.forRoot(),
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
        deps: []
      },
      parser: { provide: TranslateParser, useClass: CustomParser }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: loadConfigurations,
    //   deps: [AppConfigurationService],
    //   multi: true
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initTranslations,
    //   deps: [TranslationService],
    //   multi: true
    // },
    AuthorizationService,
    MonitoringService,
    DatePipe,
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslationService) => {
        return translate.userLanguage;
      },
      deps: [TranslationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function loadConfigurations(configService: AppConfigurationService) {
  return () => {
    return configService.init();
  };
}
