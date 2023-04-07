import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { IAnnotation } from '../../../../shared/models/annotation.model';

@Component({
  selector: 'app-text-annotation',
  templateUrl: './text-annotation.component.html',
  styleUrls: ['./text-annotation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TextAnnotationComponent {
  @Input() annotation!: IAnnotation;
  @Output() updateContent = new EventEmitter<string>();

  public annotationText: FormControl = new FormControl<string>('');

  public changeContent() {
    this.updateContent.emit(this.annotationText.value);
  }
}
