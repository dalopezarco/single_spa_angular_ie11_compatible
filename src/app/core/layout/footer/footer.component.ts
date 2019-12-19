import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hrcb-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  @Input() policyLink: string;
  @Input() disclosurPolicyText: string;

  constructor() {}

  ngOnInit() {}
}
