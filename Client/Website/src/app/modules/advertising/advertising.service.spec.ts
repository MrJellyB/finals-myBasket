import { TestBed, inject } from '@angular/core/testing';

import { AdvertisingService } from './advertising.service';

describe('AdvertisingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertisingService]
    });
  });

  it('should be created', inject([AdvertisingService], (service: AdvertisingService) => {
    expect(service).toBeTruthy();
  }));
});
