import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IAnnotation } from 'src/app/shared/models/annotation.model';

import { PageComponent } from './page.component';

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

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method: createAnnotation()', () => {
    it('should emit a value', () => {
      spyOn(component.createAnnotationEmitter, 'emit').and.callThrough();
      component.createAnnotation('text');
      expect(component.createAnnotationEmitter.emit).toHaveBeenCalled();
    });
  });

  describe('method: updateAnnotation()', () => {
    it('should emit a value', () => {
      spyOn(component.updateAnnotationEmitter, 'emit').and.callThrough();
      component.updateAnnotation(mockAnnotation);
      expect(component.updateAnnotationEmitter.emit).toHaveBeenCalled();
    });
  });

  describe('method: deleteAnnotation()', () => {
    it('should emit a value', () => {
      spyOn(component.deleteAnnotationEmitter, 'emit').and.callThrough();
      component.deleteAnnotation(mockAnnotation.id);
      expect(component.deleteAnnotationEmitter.emit).toHaveBeenCalled();
    });
  });
  
});
