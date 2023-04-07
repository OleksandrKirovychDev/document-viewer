import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DraggingDirective } from 'src/app/shared/directives/dragging.directive';

import { IAnnotation, ICoords } from '../../../shared/models/annotation.model';
import { ImageAnnotationComponent } from './image-annotation/image-annotation.component';
import { TextAnnotationComponent } from './text-annotation/text-annotation.component';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TextAnnotationComponent,
    ImageAnnotationComponent,
    DraggingDirective,
  ],
})
export class AnnotationComponent {
  @Input() annotation!: IAnnotation;
  @Input() containerId!: string;

  @Output() deleteAnnotation = new EventEmitter<number>();
  @Output() updateAnnotation = new EventEmitter<IAnnotation>();

  public setUpdatedAnnotationContent(newContent: string) {
    this.updateAnnotation.emit({ ...this.annotation, content: newContent });
  }

  public setUpdatedAnnotationCoords(coords: ICoords) {
    this.updateAnnotation.emit({ ...this.annotation, coords });
  }

  public setUpdatedAnnotationRotateDeg(deg: number) {
    const updatedAnnotation: IAnnotation = {
      ...this.annotation,
      rotateDeg: deg
    };
    this.updateAnnotation.emit(updatedAnnotation);
  }

  public delete(annotationId: number) {
    this.deleteAnnotation.emit(annotationId);
  }
}
