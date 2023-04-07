import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IAnnotation } from '../shared/models/annotation.model';

import { DocViewComponent } from './doc-view.component';

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

describe('DocViewComponent', () => {
  let component: DocViewComponent;
  let fixture: ComponentFixture<DocViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocViewComponent, RouterTestingModule, HttpClientTestingModule],
    })
      .overrideTemplate(DocViewComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method: ngOnInit', () => {
    it('should call getDocumentById', () => {
      spyOn(component['docsService'], 'getDocumentById').and.callThrough();
      component.ngOnInit();
      expect(component['docsService'].getDocumentById).toHaveBeenCalled();
    });
  });

  describe('method: updateAnnotation', () => {
    it('should call updateAnnotation', () => {
      spyOn(
        component['annotationsService'],
        'updateAnnotation'
      ).and.callThrough();
      component.updateAnnotation(mockAnnotation);
      expect(
        component['annotationsService'].updateAnnotation
      ).toHaveBeenCalled();
    });
  });

  describe('method: deleteAnnotation', () => {
    it('should call deleteAnnotation', () => {
      spyOn(
        component['annotationsService'],
        'deleteAnnotation'
      ).and.callThrough();
      component.deleteAnnotation(mockAnnotation.id);
      expect(
        component['annotationsService'].deleteAnnotation
      ).toHaveBeenCalled();
    });
  });

  describe('method: saveContent', () => {
    it('should call saveContent', () => {
      spyOn(component['annotationsService'], 'saveContent').and.callThrough();
      component.saveContent();
      expect(component['annotationsService'].saveContent).toHaveBeenCalled();
    });
  });
});
