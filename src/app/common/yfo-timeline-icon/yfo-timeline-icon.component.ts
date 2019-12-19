import { Component, OnInit, Input } from '@angular/core';
import { faCheck, faTimes, faLightbulb, faCogs } from '@fortawesome/free-solid-svg-icons';
import { TimelineStatus } from 'src/app/models/timelineStatus.model';

@Component({
  selector: 'yfo-timeline-icon',
  templateUrl: './yfo-timeline-icon.component.html',
  styleUrls: ['./yfo-timeline-icon.component.scss'],
})
export class YfoTimelineIconComponent implements OnInit {
  @Input() status: number;
  titleClass: string;
  faCheck = faCheck;
  faTimes = faTimes;
  faLightbulb = faLightbulb;
  faCogs = faCogs;
  titleIconClass: any;

  constructor() {}

  ngOnInit() {
    switch (this.status) {
      case TimelineStatus.Ok:
        this.titleClass = 'done';
        this.titleIconClass = faCheck;

        break;
      case TimelineStatus.Error:
        this.titleClass = 'rejected';
        this.titleIconClass = faTimes;

        break;
      case TimelineStatus.Warning:
        this.titleClass = 'warning';
        this.titleIconClass = faLightbulb;

        break;

      case TimelineStatus.Waiting:
        this.titleClass = 'waiting';
        this.titleIconClass = faCogs;

        break;
      default:
    }
  }
}
