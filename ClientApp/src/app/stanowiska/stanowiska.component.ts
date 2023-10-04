import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
@Component({
  selector: 'app-stanowiska',
  templateUrl: './stanowiska.component.html',
  providers: [ NgbCarouselConfig ],
})
export class StanowiskaComponent {
  constructor(config: NgbCarouselConfig, private router: Router) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

  }

  navigate(id:number){
    this.router.navigate(['/kalendarz', id]);
  }

}
