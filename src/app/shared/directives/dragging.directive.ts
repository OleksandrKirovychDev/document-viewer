import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fromEvent, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { ICoords } from '../models/annotation.model';

@Directive({
  selector: '[appDragging]',
  standalone: true,
})
export class DraggingDirective implements AfterViewInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  private _element!: HTMLElement;
  private readonly DEFAULT_DRAGGING_BOUNDARY_QUERY = 'body';

  @Input() boundaryQuery = this.DEFAULT_DRAGGING_BOUNDARY_QUERY;
  @Input() startPosition!: ICoords;
  @Input() startRotateDeg: number = 0;

  @Output() newCoordinates = new EventEmitter<ICoords>();
  @Output() newRotateDeg = new EventEmitter<number>();

  isRotating: boolean = false;
  wasDragged: boolean = false;
  draggingBoundaryElement!: HTMLElement | HTMLBodyElement | null;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.draggingBoundaryElement = (this.document as Document).querySelector(
      this.boundaryQuery
    );
    if (!this.draggingBoundaryElement) {
      throw new Error(
        "Couldn't find any element with query: " + this.boundaryQuery
      );
    } else {
      this._element = this.elementRef.nativeElement as HTMLElement;
      this.initDrag();
    }
  }

  initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this._element, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      initialDeg: number,
      currentX = this.startPosition.x,
      currentY = this.startPosition.y,
      currentDeg = this.startRotateDeg,
      elementCenter = this.getCenter(this._element);

    const minBoundX = 0;
    const minBoundY = 0;
    const maxBoundX =
      this.draggingBoundaryElement!.offsetWidth - this._element.offsetWidth;
    const maxBoundY =
      this.draggingBoundaryElement!.offsetHeight - this._element.offsetHeight;

    dragStart$
      .pipe(
        tap((event: MouseEvent) => {
          this.isRotating = (event.target! as Element).classList.contains(
            'rotate'
          );
          if (this.isRotating) {
            this._element.classList.add('rotating');
          } else {
            initialX = event.clientX - currentX;
            initialY = event.clientY - currentY;
            this._element.classList.add('dragging');
          }
        }),
        switchMap(() =>
          drag$.pipe(
            tap((event: MouseEvent) => event.preventDefault()),
            takeUntil(dragEnd$)
          )
        )
      )
      .subscribe((event: MouseEvent) => {
        if (this.isRotating) {
          const x = Math.atan2(
            event.clientY - elementCenter.y,
            event.clientX - elementCenter.x
          );
          this.wasDragged = true;
          currentDeg = x;
          this._element.style.transform = `rotate(${currentDeg}rad)`;
        } else {
          const x = event.clientX - initialX;
          const y = event.clientY - initialY;
          this.wasDragged = true;
          currentX = Math.max(minBoundX, Math.min(x, maxBoundX));
          currentY = Math.max(minBoundY, Math.min(y, maxBoundY));
          this._element.style.top = `${currentY}px`;
          this._element.style.left = `${currentX}px`;
        }
      });

    dragEnd$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      if (this.isRotating) {
        initialDeg = currentDeg;
        if (this.wasDragged) {
          this.newRotateDeg.emit(initialDeg);
          this.wasDragged = false;
        }
      } else {
        initialX = currentX;
        initialY = currentY;
        if (this.wasDragged) {
          this.newCoordinates.emit({ x: initialX, y: initialY });
          this.wasDragged = false;
        }
        this._element.classList.remove('dragging');
      }
    });
  }

  getCenter(element: HTMLElement) {
    const { left, top, width, height } = element.getBoundingClientRect();
    return { x: left + width / 2, y: top + height / 2 };
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
