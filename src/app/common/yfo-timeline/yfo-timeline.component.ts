import { Component, OnInit, Input } from '@angular/core';
import { TimelineView } from 'src/app/models/timelineView.model';

@Component({
  selector: 'yfo-timeline',
  templateUrl: './yfo-timeline.component.html',
  styleUrls: ['./yfo-timeline.component.scss'],
})
export class YfoTimelineComponent implements OnInit {
  @Input() data: TimelineView[];
  constructor() {}

  ngOnInit() {}
}
