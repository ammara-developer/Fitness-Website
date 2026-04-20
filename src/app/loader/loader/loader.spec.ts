import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class LoaderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isLoading = false;
  private animations: gsap.core.Tween[] = [];

  ngOnInit(): void {
    if (this.isLoading) {
      setTimeout(() => this.initAnimations(), 0);
    }
  }

  ngOnChanges(): void {
    if (this.isLoading) {
      setTimeout(() => this.initAnimations(), 0);
    } else {
      this.destroyAnimations();
    }
  }

  private initAnimations(): void {
    this.destroyAnimations(); // clear any previous

    this.animations.push(
      gsap.to('#border', {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 5,
        ease: 'none',
        repeat: -1
      })
    );

    this.animations.push(
      gsap.to('#up', {
        y: -10,
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    );

    this.animations.push(
      gsap.to('#up', {
        scale: 0.95,
        transformOrigin: '50% 50%',
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    );
  }

  private destroyAnimations(): void {
    this.animations.forEach(a => a.kill());
    this.animations = [];
  }

  ngOnDestroy(): void {
    this.destroyAnimations();
  }
}