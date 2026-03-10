import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, AfterViewInit, OnDestroy {

  // ===== UI STATE VARIABLES START =====
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  isVisible = false;
  private observer!: IntersectionObserver;
  // ===== UI STATE VARIABLES END =====

  constructor() {}

  ngOnInit(): void {
    console.log("About component initialized");
  }

  // ===== ANIMATION AND INTERSECTION OBSERVER START =====
  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.aboutSection?.nativeElement) {
      this.observer.observe(this.aboutSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  // ===== ANIMATION AND INTERSECTION OBSERVER END =====
}

