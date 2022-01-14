import { TestBed } from '@angular/core/testing';

import { SetInterService } from './set-inter.service';

describe('SetInterService', () => {
  let service: SetInterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetInterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
