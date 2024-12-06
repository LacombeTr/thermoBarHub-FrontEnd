import { TestBed } from '@angular/core/testing';

import { postParameters } from './calculation-api.service';

describe('CalculationAPIService', () => {
  let service: postParameters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(postParameters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
