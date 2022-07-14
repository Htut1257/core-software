import { TestBed } from '@angular/core/testing';

import { DepartmentHistoryService } from './department-history.service';

describe('DepartmentHistoryService', () => {
  let service: DepartmentHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
