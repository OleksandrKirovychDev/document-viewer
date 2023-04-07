import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomAnimationService {
  private _zoomValue$ = new BehaviorSubject<number>(1);

  get zoomValue$() {
    return this._zoomValue$.asObservable();
  }

  public zoomIn() {
    const sum = (this._zoomValue$.value + 0.1).toFixed(1);
    this._zoomValue$.next(Number(sum));
  }

  public zoomOut() {
    const sum = (this._zoomValue$.value - 0.1).toFixed(1);

    this._zoomValue$.next(Number(sum));
  }
}
