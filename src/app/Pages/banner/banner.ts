import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {



  ngOnInit(): void {
    this.animateIn();
  }

  animateIn(): void {
    gsap.fromTo('.hero-title',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
    gsap.fromTo('.hero-subtitle',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
    gsap.fromTo('.hero-bottom-left',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
    );
    gsap.fromTo('.hero-menu',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 }
    );
  }

  onExplore(): void {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMenu(): void {
    const menu = document.querySelector('.nav-menu');
    if (menu) menu.classList.toggle('active');
  }
}
