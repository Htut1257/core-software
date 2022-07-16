import { TestBed } from '@angular/core/testing';

import { SwiftSwappingService } from './swift-swapping.service';

describe('SwiftSwappingService', () => {
  let service: SwiftSwappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwiftSwappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
