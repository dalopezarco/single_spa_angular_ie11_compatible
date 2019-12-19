import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { ZoomMenuSection, ZoomMenuSectionType, ZoomMenuItem, ZoomMenuItemType, ZoomMenu, ZoomMenuType } from '@zoomui/menu';
import { AppConfigurationService } from '../configuration/app-configuration.service';
import { TranslationService } from '../translation/translation.service';
import { UiApiRoutes } from 'src/app/monitoring/shared/app.constants';
import { Menu, MenuItem } from 'src/app/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUri: string;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigurationService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    this.apiUri = UiApiRoutes.menu;
    this.setBaseUrl();
  }

  getMenus(): Observable<Menu[]> {
    const url = this.baseUrl;
    return this.http.get<Menu[]>(url);
  }

  getAllMenus(): Observable<ZoomMenu> {
    return this.getMenus().pipe(
      map(menu => {
        return this.getZoomMenu(menu);
      })
    );
  }

  getZoomMenu(zoomMenu: Menu[]) {
    const mainMenuSections: ZoomMenuSection[] = [];
    for (const section of zoomMenu) {
      const sec = this.getZoomMenuSection(section);
      mainMenuSections.push(sec);
    }
    const mainmenu = new ZoomMenu();
    mainmenu.name = ZoomMenuType.main;
    mainmenu.title = 'Menu';
    mainmenu.sections = mainMenuSections;

    return mainmenu;
  }

  getZoomMenuSection(section: Menu) {
    const sec = new ZoomMenuSection();
    sec.type = section.type in ZoomMenuSectionType ? (ZoomMenuSectionType as any)[section.type] : ZoomMenuSectionType.secondary;

    if (section.title) {
      this.translationService.getTranslation(section.title).subscribe(translatedTitle => {
        sec.title = translatedTitle;
      });
    }

    sec.items = [];

    section.menuItems.forEach(menuItem => {
      const menu = this.getZoomMenuItem(menuItem);
      sec.items.push(menu);
    });
    return sec;
  }

  getZoomMenuItem(menuItem: MenuItem): ZoomMenuItem {
    const menu = new ZoomMenuItem();
    menu.key = menuItem.uniqueName;

    if (menuItem.title) {
      this.translationService.getTranslation(menuItem.title).subscribe(translatedTitle => {
        menu.title = translatedTitle;
      });
    }

    this.translate
      .get(menuItem.title)
      .toPromise()
      .then(t => {
        menu.title = t;
      });
    menu.key = menuItem.uniqueName;
    menu.icon = menuItem.icon;
    menu.type = menuItem.isExternal ? ZoomMenuItemType.external : ZoomMenuItemType.internal;
    menu.url = menuItem.url;
    return menu;
  }

  private setBaseUrl() {
    this.appConfigService.getConfiguration().subscribe(config => (this.baseUrl = config.endpoints.apiDomain + this.apiUri));
  }
}
