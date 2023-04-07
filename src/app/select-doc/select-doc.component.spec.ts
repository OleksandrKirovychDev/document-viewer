import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDocComponent } from './select-doc.component';

describe('SelectDocComponent', () => {
  let component: SelectDocComponent;
  let fixture: ComponentFixture<SelectDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDocComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Method: ngOnInit', () => {
    it('should call loadDocumetns()', () => {
      spyOn(component['docsService'], 'loadDocuments').and.callThrough();
      component.ngOnInit();
      expect(component['docsService'].loadDocuments).toHaveBeenCalled();
    });
  });
});
