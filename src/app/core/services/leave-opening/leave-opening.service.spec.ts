import { TestBed } from '@angular/core/testing';

import { LeaveOpeningService } from './leave-opening.service';

describe('LeaveOpeningService', () => {
  let service: LeaveOpeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveOpeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
