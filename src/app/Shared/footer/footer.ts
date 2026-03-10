import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {



   // ===== UI STATE VARIABLES START =====
  activeSection = 'home';
  mobileMenuOpen = false;
  // ===== UI STATE VARIABLES END =====
setupSmoothScrolling() {}

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
