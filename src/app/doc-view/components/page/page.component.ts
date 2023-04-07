import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnotationComponent } from '../annotation/annotation.component';
import {
  IAnnotation,
  IAnnotationCreate,
} from '../../../shared/models/annotation.model';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, AnnotationComponent, ClickOutsideDirective],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input() image!: string;
  @Input() docId!: number;
  @Input() pageAnnotations: IAnnotation[] = [];
  @Input() page: number = 1;

  @Output() createAnnotationEmitter = new EventEmitter<IAnnotationCreate>();
  @Output() updateAnnotationEmitter = new EventEmitter<IAnnotation>();
  @Output() deleteAnnotationEmitter = new EventEmitter<number>();

  public currentClickedCoordinates: { x: number; y: number } = { x: 0, y: 0 };
  public showOptions: boolean = false;

  public onClick(event: MouseEvent) {
    if (this.showOptions) {
      this.showOptions = false;
    } else {
      this.currentClickedCoordinates = {
        x: event.offsetX,
        y: event.offsetY,
      };
      this.showOptions = true;
    }
  }

  public closeTypeSelect() {
    this.showOptions = false;
  }

  public createAnnotation(type: 'text' | 'image') {
    const newAnnotation: IAnnotationCreate = {
      page: this.page,
      docId: this.docId,
      type,
      content: '',
      rotateDeg: 0,
      coords: {
        x: this.currentClickedCoordinates.x,
        y: this.currentClickedCoordinates.y,
      },
    };
    this.createAnnotationEmitter.emit(newAnnotation);
  }

  public updateAnnotation(updatedAnnotation: IAnnotation) {
    this.updateAnnotationEmitter.emit(updatedAnnotation);
  }

  public deleteAnnotation(annotationId: number) {
    this.deleteAnnotationEmitter.emit(annotationId);
  }

  public closeAnnotationSelect(event: Event) {
    event.stopPropagation();
    this.closeTypeSelect();
  }
}
