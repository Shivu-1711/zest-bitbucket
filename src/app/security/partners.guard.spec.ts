import { TestBed, async, inject } from '@angular/core/testing';

import { PartnersGuard } from './partners.guard';

describe('PartnersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnersGuard]
    });
  });

  it('should ...', inject([PartnersGuard], (guard: PartnersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
