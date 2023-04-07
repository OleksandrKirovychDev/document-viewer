import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IAnnotation } from '../../../../shared/models/annotation.model';

@Component({
  selector: 'app-image-annotation',
  templateUrl: './image-annotation.component.html',
  styleUrls: ['./image-annotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ImageAnnotationComponent {
  @Input() annotation!: IAnnotation;

  @Output() updateContent = new EventEmitter<string>();

  reader = new FileReader();

  public readURL(event: Event): void {
    let files = (event.target as HTMLInputElement).files;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      this.reader.onload = () => {
        this.updateContent.emit(this.reader.result as string);
      };
      this.reader.readAsDataURL(file);
    }
  }
}
