import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('MenuService', () => {
  let service: MenuService;
  let backend: HttpTestingController;
  let mockedMenu: any;
  let mockedZoomMenu: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [TranslateService],
    });

    service = TestBed.get(MenuService);
    backend = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    mockedMenu = [
      {
        title: 'yfo.common.MyHr',
        type: 'primary',
        menuItems: [
          {
            title: 'yfo.common.Home',
            uniqueName: 'home',
            url: 'home',
            icon: 'img/icons/home.png',
            isExternal: false,
            hasSubMenu: false,
          },
        ],
      },
      {
        title: 'yfo.common.Apps',
        type: 'secondary',
        menuItems: [
          {
            title: 'yfo.common.MoreApps',
            uniqueName: 'moreapps',
            url: 'https://login.youforce.biz',
            icon: 'img/icons/moreapps.png',
            isExternal: true,
            hasSubMenu: false,
          },
        ],
      },
      {
        type: 'settings',
        menuItems: [
          {
            title: 'yfo.common.SystemSettings',
            uniqueName: 'settings',
            url: 'settings',
            icon: '',
            isExternal: false,
            hasSubMenu: false,
          },
          {
            title: 'yfo.common.Logout',
            uniqueName: 'logout',
            url: 'logout',
            icon: 'img/icons/logout.png',
            isExternal: false,
            hasSubMenu: false,
          },
        ],
      },
    ];

    mockedZoomMenu = {
      name: 'main',
      title: 'Menu',
      sections: [
        {
          type: 'primary',
          title: 'My HR',
          items: [
            {
              key: 'home',
              title: 'Home',
              icon: 'img/icons/home.png',
              type: 'internal',
              url: 'home',
            },
          ],
        },
        {
          type: 'secondary',
          title: 'Apps',
          items: [
            {
              key: 'moreapps',
              title: 'More apps',
              icon: 'img/icons/moreapps.png',
              type: 'external',
              url: 'https://login.youforce.biz',
            },
          ],
        },
        {
          type: 'secondary',
          items: [
            {
              key: 'settings',
              title: 'System settings',
              icon: '',
              type: 'internal',
              url: 'settings',
            },
            {
              key: 'logout',
              title: 'Log out',
              icon: 'img/icons/logout.png',
              type: 'internal',
              url: 'logout',
            },
          ],
        },
      ],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get menu', () => {
    service.getMenus().subscribe(data => {
      expect(data).toEqual(mockedMenu);
    });

    backend
      .expectOne(request => {
        return request.url.match(/menuitems/) && request.method === 'GET';
      })
      .flush(mockedMenu);

    backend.verify();
  });

  it('should get ZoomMenu array from Menu array', () => {
    service.getAllMenus().subscribe(data => {
      expect(data).toEqual(mockedZoomMenu);
    });

    backend
      .expectOne(request => {
        return request.url.match(/menuitems/) && request.method === 'GET';
      })
      .flush(mockedMenu);

    backend.verify();
  });
});
