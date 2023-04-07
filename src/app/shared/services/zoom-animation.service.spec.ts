import { TestBed } from '@angular/core/testing';

import { ZoomAnimationService } from './zoom-animation.service';

describe('ZoomAnimationService', () => {
  let service: ZoomAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
