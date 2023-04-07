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

  describe('Method: ZoomIn', () => {
    it('should increase the value by 0.1', () => {
      service.zoomIn();
      expect(service['_zoomValue$'].value).toBe(1.1);
      service['_zoomValue$'].next(1);
    });
  });

  describe('Method: zoomOut', () => {
    it('should decrease the value by 0.1', () => {
      service.zoomOut();
      expect(service['_zoomValue$'].value).toBe(0.9);
      service['_zoomValue$'].next(1);
    });
  });
});
