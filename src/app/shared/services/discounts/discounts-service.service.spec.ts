import { TestBed } from '@angular/core/testing';

import { DiscountsServiceService } from './discounts-service.service';

describe('DiscountsServiceService', () => {
  let service: DiscountsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
