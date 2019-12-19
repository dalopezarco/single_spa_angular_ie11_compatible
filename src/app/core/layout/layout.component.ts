import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ZoomMenu, ZoomMenuNavigateService } from '@zoomui/menu';
import { HeaderService } from 'src/app/services/header/header.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { companyName, footerLinksConfiguration } from 'src/app/monitoring/shared/app.constants';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'hrcb-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  headerTitle = '';

  menusLoaded$ = new BehaviorSubject(false);
  menusLoaded: Observable<boolean> = this.menusLoaded$.asObservable();
  menu: ZoomMenu;

  browserLocaleForFooter: string;
  footerPolicyLink: string;
  footerDisclosurPolicyText: string;

  companyName: string;

  constructor(
    private headerService: HeaderService,
    private userProfileService: UserService,
    private menuService: MenuService,
    private menuNavigationService: ZoomMenuNavigateService,
  ) {}

  ngOnInit() {
    this.getHeaderTitle();

    this.getUserInfo();

    this.setCompanyName();

    this.setFooterInfo();

    this.menuNavigationService.navigationReceived$.subscribe(item => {
      // item.action(item.key);
    });
  }

  getHeaderTitle(): void {
    this.headerService.title.subscribe(title => {
      this.headerTitle = title;
    });
  }

  loadMainMenu() {
    this.menuService.getAllMenus().subscribe(menu => {
      this.menu = menu;
      this.menusLoaded$.next(true);
    });
  }

  getUserInfo() {
    this.userProfileService.getUserDetails().subscribe(
      response => {
        window.localStorage.setItem('resourceId', response.ReferenceId);
        this.loadMainMenu();
      },
      errorResponse => {
        console.log('Error occured', errorResponse);
      },
    );
  }

  getPreferredLanguage() {
    this.browserLocaleForFooter = window.navigator.language;
    if (!!this.browserLocaleForFooter) {
      return this.browserLocaleForFooter.toLowerCase() === 'nl';
    } else {
      return false;
    }
  }

  setFooterInfo() {
    this.footerDisclosurPolicyText = 'ResponsibleDisclosurePolicy';
    this.footerPolicyLink = this.getPreferredLanguage() ? footerLinksConfiguration.nl : footerLinksConfiguration.others;
  }

  setCompanyName() {
    this.companyName = companyName;
  }
}
