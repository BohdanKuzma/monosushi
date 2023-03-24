import { TestBed } from '@angular/core/testing';

import { DiscountInfoResolver } from './discount-info.resolver';

describe('DiscountInfoResolver', () => {
  let resolver: DiscountInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DiscountInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
