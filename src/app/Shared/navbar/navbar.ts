import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  // ===== UI STATE VARIABLES START =====
  activeSection = 'home';
  mobileMenuOpen = false;
  // ===== UI STATE VARIABLES END =====

  constructor() {}

  ngOnInit(): void {
    this.setupSmoothScrolling();
  }

  // ===== NAVIGATION AND SCROLL METHODS START =====
  setupSmoothScrolling() {
    // Smooth scroll behavior is handled in CSS with html { scroll-behavior: smooth; }
  }

  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    this.mobileMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  // ===== NAVIGATION AND SCROLL METHODS END =====
}

