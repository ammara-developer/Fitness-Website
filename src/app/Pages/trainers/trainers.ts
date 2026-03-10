import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainers',
  imports: [CommonModule, FormsModule],
  templateUrl: './trainers.html',
  styleUrl: './trainers.css',
  standalone: true
})
export class Trainers implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('trainerSection') trainerSection!: ElementRef;
  
  // ===== ANIMATION AND INTERSECTION OBSERVER START =====
  isVisible = false;
  private observer!: IntersectionObserver;

  constructor() {}

  ngOnInit(): void {}

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

    if (this.trainerSection?.nativeElement) {
      this.observer.observe(this.trainerSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
