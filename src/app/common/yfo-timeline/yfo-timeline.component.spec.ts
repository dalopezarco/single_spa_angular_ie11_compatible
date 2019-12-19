import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YfoTimelineComponent } from './yfo-timeline.component';

describe('YfoTimelineComponent', () => {
  let component: YfoTimelineComponent;
  let fixture: ComponentFixture<YfoTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YfoTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YfoTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
