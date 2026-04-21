import { Component ,OnInit,OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface Slide {
  src: string;
  alt: string;
}



@Component({
  selector: 'app-fitnesstracker',
  imports: [CommonModule],
  templateUrl: './fitnesstracker.html',
  styleUrl: './fitnesstracker.css',
})
 


  export class Fitnesstracker implements OnInit, OnDestroy {

  currentIndex = 0;
  private autoPlayInterval: any;
  private readonly SPEED = 2500; // change speed here (ms)

  slides: Slide[] = [
    { src: 'assets/images/img13.jpg', alt: 'Athlete 1' },
    { src: 'assets/images/img14.jpg', alt: 'Athlete 2' },
    { src: 'assets/images/img12.jpg', alt: 'Athlete 3' },
    { src: 'assets/images/img4.jpg', alt: 'Athlete 4' },
    { src: 'assets/images/img5.jpg', alt: 'Athlete 5' },
  ];

  ngOnInit(): void {
    this.startAutoPlay();
    this.animateIn();
  }

  animateIn(): void {
    gsap.fromTo('.hero-text--top',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
    gsap.fromTo('.hero-text--bottom',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-slider',
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
    );
    gsap.fromTo('.hero-contact',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.5 }
    );
    gsap.fromTo('.hero-cta',
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.5 }
    );
    gsap.fromTo('.hero-menu',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.7 }
    );
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      // ✅ blink — instant jump, no slide
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, this.SPEED);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  goToSlide(index: number): void {
    this.stopAutoPlay();
    this.currentIndex = index;
    this.startAutoPlay();
  }

  onJoinNow(): void {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMenu(): void {
    const menu = document.querySelector('.nav-menu');
    if (menu) menu.classList.toggle('active');
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }
}