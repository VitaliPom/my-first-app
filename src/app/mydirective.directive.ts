import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMydirective]'
})
export class MydirectiveDirective {

  observer: IntersectionObserver;
  isVisibleInView = false;
 
  constructor(el: ElementRef) {

  
    this.observer = new IntersectionObserver( entries => {
      if ( entries[0].isIntersecting === true ) {
        this.isVisibleInView = true;
          console.log("visible.");
        // Probably needs to be called in production
        //
        // this.observer.disconnect();
      } else {
        // Probably not interesting in production
        // but used for demo purposes
        //
        this.isVisibleInView = false;
      }
    }, {
      threshold: 0.75
    });

    this.observer.observe(el.nativeElement as HTMLElement);
  
  }
  ngOnDestroy() {
    this.observer.disconnect();
  }
  
}
