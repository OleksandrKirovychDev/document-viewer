import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { filter, fromEvent, takeUntil, Subject } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    fromEvent(this.document, 'click')
      .pipe(
        filter((event) => !this.isInside(event.target as HTMLElement)),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  private isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
