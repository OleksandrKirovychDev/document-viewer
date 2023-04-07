import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IAnnotation, IAnnotationCreate } from '../models/annotation.model';

@Injectable({
  providedIn: 'root',
})
export class AnnotationsService {
  private _annotations$ = new BehaviorSubject<IAnnotation[]>([]);

  public get annotations$() {
    return this._annotations$.asObservable();
  }
  public createAnnotation(annotation: IAnnotationCreate) {
    this._annotations$.next([
      ...this._annotations$.value,
      { id: this._annotations$.value.length + 1, ...annotation },
    ]);
  }

  public updateAnnotation(updatedAnnotation: IAnnotation) {
    this._annotations$.next([
      ...this._annotations$.value.map((annotation) =>
        annotation.id === updatedAnnotation.id ? updatedAnnotation : annotation
      ),
    ]);
  }

  public deleteAnnotation(annotationId: number) {
    this._annotations$.next([
      ...this._annotations$.value.filter(
        (annotation) => annotation.id !== annotationId
      ),
    ]);
  }

  public saveContent() {
    console.log('Data', this._annotations$.value);
  }
}
