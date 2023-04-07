import { TestBed } from '@angular/core/testing';

import { AnnotationsService } from './annotations.service';
import { IAnnotation } from '../models/annotation.model';

const mockCreateAnnotation: Omit<IAnnotation, 'id'> = {
  docId: 1,
  page: 1,
  type: 'text',
  content: 'string',
  rotateDeg: 20,
  coords: { x: 1, y: 1 },
};
const mockAnnotation: IAnnotation = {
  id: 1,
  docId: 1,
  page: 1,
  type: 'text',
  content: 'string',
  rotateDeg: 20,
  coords: { x: 1, y: 1 },
};

describe('AnnotationsService', () => {
  let service: AnnotationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Method: createAnnotation', () => {
    it('should add annotation', () => {
      spyOn<any>(service['_annotations$'], 'next').and.callThrough();
      service.createAnnotation(mockCreateAnnotation);
      expect(service['_annotations$'].next).toHaveBeenCalled();
    });
  });

  describe('Method: updateAnnotation', () => {
    it('should update annotation', () => {
      spyOn<any>(service['_annotations$'], 'next').and.callThrough();
      service.updateAnnotation(mockAnnotation);
      expect(service['_annotations$'].next).toHaveBeenCalled();
    });
  });

  describe('Method: delete', () => {
    it('should delete annotation', () => {
      spyOn<any>(service['_annotations$'], 'next').and.callThrough();
      service.deleteAnnotation(mockAnnotation.id);
      expect(service['_annotations$'].next).toHaveBeenCalled();
    });
  });

  describe('Method: delete', () => {
    it('should delete annotation', () => {
      spyOn<any>(console, 'log').and.callThrough();
      service.saveContent();
      expect(console.log).toHaveBeenCalled();
    });
  });
});
