import { TestBed } from '@angular/core/testing';

import { CanActivateGuardService } from './can-activate-guard.service';

describe('CanActivateGuardService', () => {
  let service: CanActivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateGuardService);
  });

  it('should be created', () => {
    const service: CanActivateGuardService = TestBed.get(CanActivateGuardService);
    expect(service).toBeTruthy();
  });
});
