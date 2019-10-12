import { TestBed } from '@angular/core/testing';

import { MyObserverService } from './my-observer.service';

describe('MyObserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyObserverService = TestBed.get(MyObserverService);
    expect(service).toBeTruthy();
  });
});
