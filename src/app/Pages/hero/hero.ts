import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {


  // ===== UI STATE VARIABLES START =====
  activeSection = 'home';
  mobileMenuOpen = false;
  // ===== UI STATE VARIABLES END =====
scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    this.mobileMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

   ngOnInit(): void {
    console.log("Footer initialized");
  }

}
