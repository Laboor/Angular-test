import { TestBed } from '@angular/core/testing';

import { NewDiService } from './new-di.service';

describe('NewDiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewDiService = TestBed.get(NewDiService);
    expect(service).toBeTruthy();
  });
});
