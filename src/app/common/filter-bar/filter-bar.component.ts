import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @Input() opened: boolean;
  opened$ = new BehaviorSubject(false);

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.opened$.next(this.opened);
  }

  switchOpened() {
    this.opened$.next(!this.opened$.value);
    this.ref.detectChanges();
  }
}
