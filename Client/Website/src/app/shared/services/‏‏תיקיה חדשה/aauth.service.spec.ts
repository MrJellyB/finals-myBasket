import { TestBed, inject } from '@angular/core/testing';

import { AauthService } from './aauth.service';

describe('AauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AauthService]
    });
  });

  it('should be created', inject([AauthService], (service: AauthService) => {
    expect(service).toBeTruthy();
  }));
});
