import { TimelineStatus } from './timelineStatus.model';

export interface TimelineView {
  title: string;
  messages: string[];
  status: TimelineStatus;
}
