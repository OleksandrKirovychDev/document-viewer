import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoomAnimationService } from '../../shared/services/zoom-animation.service';
import { AnnotationsService } from '../../shared/services/annotations.service';

@Component({
  selector: 'app-zoomer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zoomer.component.html',
  styleUrls: ['./zoomer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomerComponent {
  constructor(
    protected zoomAnimationService: ZoomAnimationService,
    protected annotationsService: AnnotationsService
  ) {}
}
