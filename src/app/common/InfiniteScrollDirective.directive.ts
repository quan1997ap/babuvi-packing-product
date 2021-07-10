import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective {

  @Input() scrollThreshold: number; // px

  constructor(private element: ElementRef) {}

  @Input('infiniteScroll') loadMore;

  @HostListener('scroll')
  public onScroll() {
    const scrolled = this.element.nativeElement.scrollTop;
    const height = this.element.nativeElement.offsetHeight;
    console.log(height);
    // // if we have reached the threshold and we scroll down
    // if (height - scrolled < this.scrollThreshold) {
      this.loadMore();
    // }

  }

}