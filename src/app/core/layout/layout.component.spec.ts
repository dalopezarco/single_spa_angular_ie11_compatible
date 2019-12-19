import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ZoomNotificationComponent } from '@zoomui/notification';
import { ZoomOutputComponent } from '@zoomui/output';
import { ZoomButtonComponent } from '@zoomui/button';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ZoomPageTemplateModule } from '@zoomui/page-template';
import { ZoomMenuNavigateService } from '@zoomui/menu';

describe('LayoutComponent', () => {
  let fixture: ComponentFixture<LayoutComponent>;
  let component: LayoutComponent;

  const dependentZoomUiComponents = [ZoomNotificationComponent, ZoomOutputComponent, ZoomButtonComponent];
  const dependentComponents = [HeaderComponent, FooterComponent];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, MockComponents(...dependentComponents, ...dependentZoomUiComponents)],
      imports: [OAuthModule.forRoot(), TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule, ZoomPageTemplateModule],
      providers: [ZoomMenuNavigateService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
