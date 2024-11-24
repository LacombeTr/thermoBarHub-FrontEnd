import { TestBed } from '@angular/core/testing';

import { CalculationAPIService } from './calculation-api.service';

describe('CalculationAPIService', () => {
  let service: CalculationAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
