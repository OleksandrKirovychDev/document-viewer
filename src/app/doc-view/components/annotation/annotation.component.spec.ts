import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IAnnotation } from 'src/app/shared/models/annotation.model';
import { AnnotationComponent } from './annotation.component';

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

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationComponent],
    })
      .overrideTemplate(AnnotationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method: setUpdatedAnnotationContent()', () => {
    it('should emit a value', () => {
      spyOn(component.updateAnnotation, 'emit').and.callThrough();
      component.setUpdatedAnnotationContent('text');
      expect(component.updateAnnotation.emit).toHaveBeenCalled();
    });
  });

  describe('method: setUpdatedAnnotationCoords()', () => {
    it('should emit a value', () => {
      spyOn(component.updateAnnotation, 'emit').and.callThrough();
      component.setUpdatedAnnotationCoords({ x: 0, y: 0 });
      expect(component.updateAnnotation.emit).toHaveBeenCalled();
    });
  });

  describe('method: setUpdatedAnnotationRotateDeg()', () => {
    it('should emit a value', () => {
      spyOn(component.updateAnnotation, 'emit').and.callThrough();
      component.setUpdatedAnnotationRotateDeg(1);
      expect(component.updateAnnotation.emit).toHaveBeenCalled();
    });
  });

  describe('method: delete()', () => {
    it('should emit a value', () => {
      spyOn(component.deleteAnnotation, 'emit').and.callThrough();
      component.delete(1);
      expect(component.deleteAnnotation.emit).toHaveBeenCalled();
    });
  });
});
