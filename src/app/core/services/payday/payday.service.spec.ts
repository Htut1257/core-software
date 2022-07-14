import { TestBed } from '@angular/core/testing';

import { PaydayService } from './payday.service';

describe('PaydayService', () => {
  let service: PaydayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaydayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
