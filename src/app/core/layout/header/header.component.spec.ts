import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MockComponents } from 'ng-mocks';
import { ZoomPageTemplateModule } from '@zoomui/page-template';
import { HeaderComponent } from './header.component';
import { BackButtonComponent } from '../back-button/back-button.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  const dependentComponents = [BackButtonComponent, MainMenuComponent];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MockComponents(...dependentComponents)],
      imports: [TranslateModule.forRoot(), ZoomPageTemplateModule],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
