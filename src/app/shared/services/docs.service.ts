import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

import { IDoc } from '../models/doc.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  private _docs$ = new BehaviorSubject<IDoc[]>([]);

  public get docs$() {
    return this._docs$.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadDocuments(): Observable<IDoc[]> {
    return this.http
      .get<IDoc[]>(`${environment.BASE_URL}/docs`)
      .pipe(tap((docs) => this._docs$.next(docs)));
  }

  public getDocumentById(docId: number): Observable<IDoc> {
    const doc = this._docs$.value.find((doc) => doc.id === docId)!;
    return of(doc);
  }
}
