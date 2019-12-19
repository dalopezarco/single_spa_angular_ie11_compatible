import { TestBed } from '@angular/core/testing';

import { HeaderService } from './header.service';
import { BehaviorSubject } from 'rxjs';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return title', () => {
    const subject = new BehaviorSubject('TitleTest');
    expect(service.setTitle(subject)).toBeUndefined();
  });
});
