import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YfoTimelineIconComponent } from './yfo-timeline-icon.component';

describe('YfoTimelineIconComponent', () => {
  let component: YfoTimelineIconComponent;
  let fixture: ComponentFixture<YfoTimelineIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YfoTimelineIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YfoTimelineIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
