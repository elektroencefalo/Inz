import {Component, HostListener, Renderer2, ElementRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthorizationService} from "../Services/authorization.service";

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isMenuActive = false;
  isLogged: boolean = false;

  constructor(
    private titleService: Title,
    private renderer: Renderer2,
    private el: ElementRef,
    private authorizationsService: AuthorizationService
  ) {
    titleService.setTitle('Fishing Booking Website');
    this.authorizationsService.isLogged?.subscribe((res: boolean) => {
      this.isLogged = res;
    })
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  logout() {
    this.authorizationsService.logout();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = this.el.nativeElement.querySelector('header');
    if (header) { // Check if header is not null
      if (window.scrollY > 0) {
        this.renderer.addClass(header, 'sticky');
      } else {
        this.renderer.removeClass(header, 'sticky');
      }
    }
  }
}
