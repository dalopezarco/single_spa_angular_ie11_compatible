import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yfo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  @Input() cardTitle: string;
  linkText = 'yfo.younifier.Show';
  show = false;

  constructor() {}

  ngOnInit() {}

  switchView() {
    if (this.show) {
      this.linkText = 'yfo.younifier.Show';
      this.show = false;
    } else {
      this.linkText = 'yfo.younifier.Hide';
      this.show = true;
    }
  }
}
