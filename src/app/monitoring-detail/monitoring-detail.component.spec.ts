import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringDetailComponent } from './monitoring-detail.component';

describe('MonitoringDetailComponent', () => {
  let component: MonitoringDetailComponent;
  let fixture: ComponentFixture<MonitoringDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
