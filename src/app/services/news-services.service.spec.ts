import { TestBed } from '@angular/core/testing';

import { NewsServicesService } from './news-services.service';

describe('NewsServicesService', () => {
  let service: NewsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
