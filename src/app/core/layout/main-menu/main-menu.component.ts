import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { ZoomMenu } from '@zoomui/menu';
import { BehaviorSubject } from 'rxjs';
// import { ZoomMenuSectionPrimaryComponent } from '@zoomui/menu/lib/zoom-menu-section-primary/zoom-menu-section-primary.component';

@Component({
  selector: 'hrcb-main-menu',
  templateUrl: './main-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit, AfterViewChecked {
  raetId = 'raet-menu';
  @Input() menu: ZoomMenu;
  @Input() menusLoaded: BehaviorSubject<boolean>;
  // @ViewChildren(ZoomMenuSectionPrimaryComponent) zoomSection!: QueryList<ZoomMenuSectionPrimaryComponent>;

  constructor() {}

  ngOnInit() {}
  ngAfterViewChecked(): void {
  }
}
