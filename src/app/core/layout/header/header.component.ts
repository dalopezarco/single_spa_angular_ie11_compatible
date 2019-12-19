import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ZoomMenu } from '@zoomui/menu';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'hrcb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() menu: ZoomMenu;
  @Input() menusLoaded: BehaviorSubject<boolean>;

  constructor() {}

  ngOnInit() {}
}
