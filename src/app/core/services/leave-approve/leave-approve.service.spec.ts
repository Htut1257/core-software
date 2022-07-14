import { TestBed } from '@angular/core/testing';

import { LeaveApproveService } from './leave-approve.service';

describe('LeaveApproveService', () => {
  let service: LeaveApproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveApproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
