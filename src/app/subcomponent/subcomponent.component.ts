import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-subcomponent',
  templateUrl: './subcomponent.component.html',
  styleUrls: ['./subcomponent.component.css']
})
export class SubcomponentComponent {
  observer: IntersectionObserver;
  isVisibleInView = false;
  el: ElementRef;
  title: string;

  constructor(el: ElementRef) {
    this.el = el; 
    this.title = "Hi "+Math.floor(Math.random() * 100);
    this.isVisibleInView = false;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.observer = new IntersectionObserver( entries => {
      if ( entries[0].isIntersecting === true && this.isVisibleInView === false) {
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
    });

    this.observer.observe(this.el.nativeElement as HTMLElement);
  
  }
  ngOnDestroy() {
    this.observer.disconnect();
  }
}
