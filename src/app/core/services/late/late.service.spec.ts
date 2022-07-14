import { TestBed } from '@angular/core/testing';

import { LateService } from './late.service';

describe('LateService', () => {
  let service: LateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
