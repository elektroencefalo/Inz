import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit, OnDestroy {

  stationNumber = 1;
  fromDate = "";
  endDate = "";

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<i class='far fa-long-arrow-alt-left'></i>", "<i class='far fa-long-arrow-alt-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };

  targetDate = new Date('2024/01/01');
  diff: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  intervalId: any;

  constructor(config: NgbCarouselConfig, private router: Router) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

    this.diff = 0;
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  navigateToCalendar() {
    this.router.navigate([`kalendarz/${this.stationNumber}/${this.fromDate}/${this.endDate}`]);
  }

  updateCountdown(): void {
    this.diff = this.targetDate.getTime() - new Date().getTime();

    this.days = Math.floor(this.diff / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.diff % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.diff % (1000 * 60)) / 1000);
  }
}
