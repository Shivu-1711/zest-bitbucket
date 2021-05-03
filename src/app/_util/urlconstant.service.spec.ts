import { TestBed } from '@angular/core/testing';

import { UrlconstantService } from './urlconstant.service';

describe('UrlconstantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlconstantService = TestBed.get(UrlconstantService);
    expect(service).toBeTruthy();
  });
});
