import { TestBed } from '@angular/core/testing';

import { BonusHistoryService } from './bonus-history.service';

describe('BonusHistoryService', () => {
  let service: BonusHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonusHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
