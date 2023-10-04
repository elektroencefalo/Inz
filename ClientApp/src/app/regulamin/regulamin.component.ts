import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-regulamin',
  templateUrl: './regulamin.component.html',
  providers: [ NgbCarouselConfig ],
})
export class RegulaminComponent {
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

  }

}
