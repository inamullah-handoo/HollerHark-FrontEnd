import { TestBed } from '@angular/core/testing';

import { ComplaintAuthService } from './complaint-auth.service';

describe('ComplaintAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplaintAuthService = TestBed.get(ComplaintAuthService);
    expect(service).toBeTruthy();
  });
});
