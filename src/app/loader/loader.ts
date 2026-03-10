import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader/loader.html',
  styleUrls: ['./loader/loader.css'],
})
export class Loader implements OnInit, AfterViewInit, OnDestroy {

  isLoading = true;
  private subscription!: Subscription;
  private borderTween!: gsap.core.Tween;
  private manTl!: gsap.core.Timeline;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loading$.subscribe(state => {
      this.isLoading = state;
      if (state) {
        setTimeout(() => this.startAnimations(), 150);
      } else {
        this.stopAnimations();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.startAnimations(), 150);
  }

  startAnimations(): void {
    const up = document.querySelector('#up');
    const border = document.querySelector('#border');

    if (!up || !border) {
      console.warn('SVG elements not found!');
      return;
    }

    // ✅ kill old animations
    this.borderTween?.kill();
    this.manTl?.kill();

    // ✅ set transform properties for SVG
    gsap.set(['#up', '#down', '#border'], {
      transformOrigin: '50% 50%',
      transformBox: 'fill-box',
    });

    // ✅ 1. Border spinning
    this.borderTween = gsap.to('#border', {
      duration: 3,
      rotation: 360,
      ease: 'none',
      repeat: -1,
    });

    // ✅ 2. Man animation — simulates exercise movement
    this.manTl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      delay: 1,
    });

    this.manTl
      // crouch down — simulates #down pose
      .to('#up', {
        duration: 0.8,
        scaleY: 0.75,
        scaleX: 1.1,
        y: 12,
        ease: 'power1.inOut',
        transformOrigin: '50% 100%',
        transformBox: 'fill-box',
      })
      // jump up — simulates #up pose
      .to('#up', {
        duration: 0.8,
        scaleY: 1,
        scaleX: 1,
        y: 0,
        ease: 'power1.inOut',
        transformOrigin: '50% 100%',
        transformBox: 'fill-box',
      });
  }

  stopAnimations(): void {
    this.borderTween?.kill();
    this.manTl?.kill();

    // Reset all animation transforms
    gsap.set('#up', {
      y: 0,
      scaleY: 1,
      scaleX: 1,
      rotation: 0,
    });

    gsap.set('#border', {
      rotation: 0,
    });

    // Ensure circle elements are visible
    gsap.set(['.circle', '.border'], {
      opacity: 1,
      visibility: 'visible',
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.stopAnimations();
  }
}