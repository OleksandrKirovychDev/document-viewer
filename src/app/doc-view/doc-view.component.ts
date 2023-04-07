import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './components/page/page.component';

import { Observable } from 'rxjs';

import { ZoomAnimationService } from '../shared/services/zoom-animation.service';
import {
  IAnnotation,
  IAnnotationCreate,
} from '../shared/models/annotation.model';
import { DynamicFilterPipe } from '../shared/pipes/dynamic-filter.pipe';
import { AnnotationsService } from '../shared/services/annotations.service';
import { DocsService } from '../shared/services/docs.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IDoc } from '../shared/models/doc.model';

@Component({
  selector: 'app-doc-view',
  standalone: true,
  imports: [CommonModule, PageComponent, DynamicFilterPipe, RouterModule],
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewComponent implements OnInit {
  public annotations$ = this.annotationsService.annotations$;
  public doc$!: Observable<IDoc>;
  public defaultWidth: number = 600;

  private _urlId: number = Number(this.router.snapshot.params['id']);

  constructor(
    protected zoomAnimationService: ZoomAnimationService,
    private annotationsService: AnnotationsService,
    private router: ActivatedRoute,
    private docsService: DocsService
  ) {}

  ngOnInit(): void {
    this.doc$ = this.docsService.getDocumentById(this._urlId);
  }

  public createAnnotation(annotation: IAnnotationCreate) {
    this.annotationsService.createAnnotation(annotation);
  }

  public updateAnnotation(updatedAnnotation: IAnnotation) {
    this.annotationsService.updateAnnotation(updatedAnnotation);
  }

  public deleteAnnotation(annotationId: number) {
    this.annotationsService.deleteAnnotation(annotationId);
  }

  public saveContent() {
    this.annotationsService.saveContent();
  }
}
