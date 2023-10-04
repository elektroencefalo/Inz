import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

interface Image {
  src: string;
  alt: string;
}
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  providers: [ NgbCarouselConfig ],
})
export class GaleriaComponent {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  @ViewChild('myModal', { static: true }) modal!: ElementRef;
  @ViewChild('img01', { static: true }) modalImg!: ElementRef;
  @ViewChild('caption', { static: true }) captionText!: ElementRef;

  images = [
    { src: '../../assets/images/a.jpg', alt: 'Description 1' },
    { src: '../../assets/images/a1.jpg', alt: 'Description 2' },
    { src: '../../assets/images/a2.jpg', alt: 'Description 3' },
    { src: '../../assets/images/a3.jpg', alt: 'Description 4' },
    { src: '../../assets/images/a4.jpg', alt: 'nazwa' },
    { src: '../../assets/images/a5.jpg', alt: 'nazwa' },
    { src: '../../assets/images/a6.jpg', alt: 'nazwa' },
    { src: '../../assets/images/a7.jpg', alt: 'nazwa' }
  ];

  currentImageIndex: number = 0;


  openModal(image: Image, index: number): void {
    this.modal.nativeElement.style.display = 'block';
    this.modalImg.nativeElement.src = image.src;
    this.captionText.nativeElement.innerHTML = image.alt;
    this.currentImageIndex = index;
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }

  showNextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.modalImg.nativeElement.src = this.images[this.currentImageIndex].src;
    this.captionText.nativeElement.innerHTML = this.images[this.currentImageIndex].alt;
  }

  showPreviousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.modalImg.nativeElement.src = this.images[this.currentImageIndex].src;
    this.captionText.nativeElement.innerHTML = this.images[this.currentImageIndex].alt;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.modal.nativeElement.style.display === 'block') {
      if (event.keyCode === 37) {
        this.showPreviousImage();
      } else if (event.keyCode === 39) {
        this.showNextImage();
      }
    }
  }
}
