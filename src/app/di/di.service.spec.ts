import { TestBed } from '@angular/core/testing';

import { DiService } from './di.service';

describe('DiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiService = TestBed.get(DiService);
    expect(service).toBeTruthy();
  });
});
