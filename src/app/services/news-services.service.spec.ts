import { TestBed } from '@angular/core/testing';

import { NewsServicesService } from './news-services.service';
import {} from "@angular/common/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NewsServicesService', () => {
  let service: NewsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[NewsServicesService],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(NewsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
