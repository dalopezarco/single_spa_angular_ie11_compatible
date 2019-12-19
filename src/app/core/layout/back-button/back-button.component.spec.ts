import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonComponent } from './back-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('BackbuttonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  const location = {
    back: jasmine.createSpy('back'),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackButtonComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Location, useValue: location }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location back once when back button is clicked', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalledTimes(1);
  });
});
