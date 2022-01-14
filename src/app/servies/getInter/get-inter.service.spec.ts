import { TestBed } from '@angular/core/testing';

import { GetInterService } from './get-inter.service';

describe('GetInterService', () => {
  let service: GetInterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
