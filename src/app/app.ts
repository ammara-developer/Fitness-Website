// ===== IMPORTS AND INTERFACES START =====
import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderService } from './loader/loader.service';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { Loader } from './loader/loader';
import { Navbar } from './Shared/navbar/navbar';
import { Footer } from "./Shared/footer/footer";
import { Hero } from "./Pages/hero/hero";
import { About } from "./Pages/about/about";
import { Fitnesstracker } from "./Pages/fitnesstracker/fitnesstracker";
import { Trainers } from "./Pages/trainers/trainers";
import { Banner } from './Pages/banner/banner';
import { Schedule } from './Pages/schedule/schedule';
import { Choose } from './Pages/choose/choose';
import { Testimonial } from './Pages/testimonial/testimonial';

export interface Feature {
  icon: string;
  label: string;
  highlighted?: boolean;
}
interface ScheduleEntry {
  time: string;
  day: string;
  class: GymClass;
}
interface GymClass {
  name: string;
  trainer: string;
  type: string;
}
interface TimeSlot {
  time: string;
  short: string;
}
interface Service {
  id: number;
  title: string;
  description: string;
  images: string[];
}
interface Trainer {
  name: string;
  role: string;
  description: string;
  image: string;
}
interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}
// ===== IMPORTS AND INTERFACES END =====

// ===== COMPONENT DECLARATION START =====
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    Loader,
    Navbar,
    Footer,
    Hero,
    About,
    Fitnesstracker,
    Trainers,
    Banner,
    Schedule,
    Choose,
    Testimonial
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})
// ===== COMPONENT DECLARATION END =====

// ===== COMPONENT CLASS START =====
export class App implements OnInit, AfterViewInit, OnDestroy {

  title = 'HyperFit';

  @ViewChild('heroVideo') heroVideoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('scheduleSection') scheduleSection!: ElementRef;

  // ===== LOADER INITIALIZATION START =====
  constructor(
    private el: ElementRef,
    private loaderService: LoaderService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    }, 3000);
    setTimeout(() => {
      this.initializeVideo();
    }, 200);
  }
  // ===== LOADER INITIALIZATION END =====

  // ===== VIDEO INITIALIZATION START =====
  private initializeVideo() {
    const video = document.querySelector('.hero-video') as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.loop = true;
      video.autoplay = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
          })
          .catch((error) => {
            console.error('Video autoplay failed:', error);
            setTimeout(() => {
              video.play().catch(e => console.error('Retry failed:', e));
            }, 500);
          });
      }
    }
  }
  // ===== VIDEO INITIALIZATION END =====

  // ===== UI STATE VARIABLES START =====
  activeSection = 'home';
  mobileMenuOpen = false;
  pricingType = 'monthly';
  // ===== UI STATE VARIABLES END =====

  // ===== PRICING METHODS START =====
  setPricingType(type: string) {
    this.pricingType = type;
  }

  getCurrentPlans(): PricingPlan[] {
    return this.pricingType === 'yearly' ? this.yearlyPlans : this.monthlyPlans;
  }
  // ===== PRICING METHODS END =====

  // ===== SERVICES DATA START =====
  services: Service[] = [
    {
      id: 1,
      title: 'Personal Training',
      description: 'One-on-one coaching, fully focused on your goals, fitness level, and progress.',
      images: ['images/img1.jpg', 'images/img1.jpg', 'images/img1.jpg']
    },
    {
      id: 2,
      title: 'Nutrition Guidance',
      description: 'Simple, practical food advice that works in real life. No extremes, just balance.',
      images: ['/images/img2.jpg', '/images/img2-2.jpg', '/images/img2-3.jpg']
    },
    {
      id: 3,
      title: 'Strength & Conditioning',
      description: 'Structured programs to build muscle, boost stamina, and stay injury-free.',
      images: ['assets/service3.jpg', 'assets/service3-2.jpg', 'assets/service3-3.jpg']
    },
    {
      id: 4,
      title: 'Yoga & Flexibility',
      description: 'Find balance in your body and mind with calming, mobility-focused sessions.',
      images: ['assets/service4.jpg', 'assets/service4-2.jpg', 'assets/service4-3.jpg']
    },
    {
      id: 5,
      title: 'Progress Tracking',
      description: 'We track what matters — so you can see how far you\'ve come, and where you\'re headed next.',
      images: ['assets/service5.jpg', 'assets/service5-2.jpg', 'assets/service5-3.jpg']
    }
  ];
  // ===== SERVICES DATA END =====

  // ===== TRAINERS DATA START =====
  trainers: Trainer[] = [
    {
      name: 'Anjali Singh',
      role: 'Strength & Functional Coach',
      description: 'Empowering women through strength and movement. 6+ years of experience.',
      image: 'assets/trainer1.jpg'
    },
    {
      name: 'Rohan Mehta',
      role: 'Personal Trainer & Nutrition',
      description: 'Believes in slow, sustainable changes that stick — with a mix of grit and grace.',
      image: 'assets/trainer2.jpg'
    },
    {
      name: 'Priya Das',
      role: 'Yoga & Flexibility Coach',
      description: 'Helps people reconnect with their bodies through mindful movement.',
      image: 'assets/trainer3.jpg'
    }
  ];
  // ===== TRAINERS DATA END =====

  // ===== PRICING PLANS DATA START =====
  monthlyPlans: PricingPlan[] = [
    {
      name: 'Starter Membership',
      price: '$244.99',
      period: 'MONTH',
      features: [
        'Unlimited gym access',
        'Group fitness classes',
        '1 personal training session/month',
        'No long-term commitment',
        'Flexible schedule — come in anytime'
      ]
    },
    {
      name: 'Progress Membership',
      price: '$649.99',
      period: '3 MONTH',
      features: [
        'Everything in Starter',
        '2 personal training sessions every month',
        'Customised workout plan',
        'Community events & wellness sessions',
        'Progress tracking and monthly check-ins',
        'Priority support from our training team'
      ],
      popular: true
    },
    {
      name: 'Commit Membership',
      price: '$1,199.00',
      period: '6 MONTH',
      features: [
        'Everything in the Progress plan',
        '4 personal training sessions every month',
        'Access to workshops & expert sessions',
        'Exclusive invites to premium events',
        'Best value for consistent, long-term'
      ]
    }
  ];

  yearlyPlans: PricingPlan[] = [
    {
      name: 'Starter Membership',
      price: '$199.00',
      period: 'MONTH',
      features: [
        'Unlimited gym access',
        'Group fitness classes',
        '1 personal training session/month',
        'No long-term commitment',
        'Flexible schedule — come in anytime'
      ]
    },
    {
      name: 'Progress Membership',
      price: '$549.99',
      period: '3 MONTH',
      features: [
        'Everything in Starter',
        '2 personal training sessions every month',
        'Customised workout plan',
        'Community events & wellness sessions',
        'Progress tracking and monthly check-ins',
        'Priority support from our training team'
      ],
      popular: true
    },
    {
      name: 'Commit Membership',
      price: '$899.00',
      period: '6 MONTH',
      features: [
        'Everything in the Progress plan',
        '4 personal training sessions every month',
        'Access to workshops & expert sessions',
        'Exclusive invites to premium events',
        'Best value for consistent, long-term'
      ]
    }
  ];
  // ===== PRICING PLANS DATA END =====

  // ===== CONTACT FORM DATA START =====
  contactForm = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };
  // ===== CONTACT FORM DATA END =====

  // ===== NAVIGATION AND SCROLL METHODS START =====
  setupSmoothScrolling() {}

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

  // ===== CONTACT FORM METHODS START =====
  submitContact() {
    const formData = {
      name: this.contactForm.name,
      email: this.contactForm.email,
      phone: this.contactForm.phone,
      service: this.contactForm.service,
      message: this.contactForm.message
    };

    this.http.post('https://formspree.io/f/xyzabcde', formData)
      .subscribe({
        next: () => {
          alert('Thank you! Your message has been sent.');
          this.resetContactForm();
        },
        error: () => {
          alert('Something went wrong. Please try again.');
        }
      });
  }

  resetContactForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    };
  }
  // ===== CONTACT FORM METHODS END =====

  // ===== ANIMATION AND INTERSECTION OBSERVER START =====
  isVisible = false;
  private observer!: IntersectionObserver;

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

    const target = this.scheduleSection?.nativeElement ?? this.aboutSection?.nativeElement;
    if (target) {
      this.observer.observe(target);
    }
  }
  // ===== ANIMATION AND INTERSECTION OBSERVER END =====

  // ===== SCHEDULE AND CLASS DATA START =====
  activeDay = 'Monday';
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  timeSlots: TimeSlot[] = [
    { time: '06:00 – 08:00', short: '06–08' },
    { time: '08:00 – 10:00', short: '08–10' },
    { time: '10:00 – 12:00', short: '10–12' },
    { time: '12:00 – 14:00', short: '12–14' },
    { time: '14:00 – 16:00', short: '14–16' },
    { time: '16:00 – 18:00', short: '16–18' },
    { time: '18:00 – 20:00', short: '18–20' },
  ];

  legendItems = [
    { color: '#FFD700', label: 'Boxing / Spin' },
    { color: '#ff6464', label: 'Cardio' },
    { color: '#64c8ff', label: 'Yoga' },
    { color: '#ffa032', label: 'Zumba / Craze' },
    { color: '#b450ff', label: 'Bootcamp' },
    { color: '#50ffa0', label: 'Sculpt' },
    { color: '#ff8c00', label: 'Muscle / Tone' },
    { color: '#ff64b4', label: 'Stretch' },
  ];

  private schedule: ScheduleEntry[] = [
    { time: '06:00 – 08:00', day: 'Monday',    class: { name: 'BOXING',   trainer: 'Prof. Smith',   type: 'boxing' } },
    { time: '10:00 – 12:00', day: 'Monday',    class: { name: 'YOGA',     trainer: 'Robert Cage',   type: 'yoga' } },
    { time: '14:00 – 16:00', day: 'Monday',    class: { name: 'CARDIO',   trainer: 'Robert Cage',   type: 'cardio' } },
    { time: '16:00 – 18:00', day: 'Monday',    class: { name: 'SCULPT',   trainer: 'Mrs. Johnson',  type: 'sculpt' } },
    { time: '18:00 – 20:00', day: 'Monday',    class: { name: 'BOXING',   trainer: 'Prof. Smith',   type: 'boxing' } },
    { time: '08:00 – 10:00', day: 'Tuesday',   class: { name: 'BOXING',   trainer: 'Robert Cage',   type: 'boxing' } },
    { time: '12:00 – 14:00', day: 'Tuesday',   class: { name: 'BOXING',   trainer: 'Robert Cage',   type: 'boxing' } },
    { time: '16:00 – 18:00', day: 'Tuesday',   class: { name: 'SPIN',     trainer: 'Robert Cage',   type: 'spin' } },
    { time: '18:00 – 20:00', day: 'Tuesday',   class: { name: 'MUSCLE',   trainer: 'Robert Cage',   type: 'muscle' } },
    { time: '06:00 – 08:00', day: 'Wednesday', class: { name: 'CARDIO',   trainer: 'Robert Cage',   type: 'cardio' } },
    { time: '08:00 – 10:00', day: 'Wednesday', class: { name: 'BOXING',   trainer: 'Robert Cage',   type: 'boxing' } },
    { time: '10:00 – 12:00', day: 'Wednesday', class: { name: 'ZUMBA',    trainer: 'Mrs. Johnson',  type: 'zumba' } },
    { time: '14:00 – 16:00', day: 'Wednesday', class: { name: 'ZUMBA',    trainer: 'Robert Cage',   type: 'zumba' } },
    { time: '18:00 – 20:00', day: 'Wednesday', class: { name: 'STRETCH',  trainer: 'Mrs. Johnson',  type: 'stretch' } },
    { time: '06:00 – 08:00', day: 'Thursday',  class: { name: 'BOXING',   trainer: 'Robert Cage',   type: 'boxing' } },
    { time: '10:00 – 12:00', day: 'Thursday',  class: { name: 'BOXING',   trainer: 'Robert Cage',   type: 'boxing' } },
    { time: '14:00 – 16:00', day: 'Thursday',  class: { name: 'BOXING',   trainer: 'Robert Cage',   type: 'boxing' } },
    { time: '16:00 – 18:00', day: 'Thursday',  class: { name: 'YOGA',     trainer: 'Ms. Garcia',    type: 'yoga' } },
    { time: '10:00 – 12:00', day: 'Friday',    class: { name: 'SCULPT',   trainer: 'Robert Cage',   type: 'sculpt' } },
    { time: '12:00 – 14:00', day: 'Friday',    class: { name: 'SPIN',     trainer: 'Robert Cage',   type: 'spin' } },
    { time: '16:00 – 18:00', day: 'Friday',    class: { name: 'BOOTCAMP', trainer: 'Robert Cage',   type: 'bootcamp' } },
    { time: '18:00 – 20:00', day: 'Friday',    class: { name: 'ZUMBA',    trainer: 'Robert Cage',   type: 'zumba' } },
    { time: '06:00 – 08:00', day: 'Saturday',  class: { name: 'CRAZE',    trainer: 'Robert Cage',   type: 'zumba' } },
    { time: '08:00 – 10:00', day: 'Saturday',  class: { name: 'BOOTCAMP', trainer: 'Robert Cage',   type: 'bootcamp' } },
    { time: '12:00 – 14:00', day: 'Saturday',  class: { name: 'TONE UP',  trainer: 'Robert Cage',   type: 'muscle' } },
    { time: '14:00 – 16:00', day: 'Saturday',  class: { name: 'MUSCLE',   trainer: 'Robert Cage',   type: 'muscle' } },
    { time: '18:00 – 20:00', day: 'Saturday',  class: { name: 'BOXING',   trainer: 'Ms. Garcia',    type: 'boxing' } },
    { time: '08:00 – 10:00', day: 'Sunday',    class: { name: 'BOXING',   trainer: 'Ms. Garcia',    type: 'boxing' } },
    { time: '14:00 – 16:00', day: 'Sunday',    class: { name: 'STRETCH',  trainer: 'Ms. Garcia',    type: 'stretch' } },
    { time: '16:00 – 18:00', day: 'Sunday',    class: { name: 'CARDIO',   trainer: 'Robert Cage',   type: 'cardio' } },
  ];

  getClass(time: string, day: string): GymClass | null {
    const entry = this.schedule.find(e => e.time === time && e.day === day);
    return entry ? entry.class : null;
  }
  // ===== SCHEDULE AND CLASS DATA END =====

  // ===== FEATURES AND PARALLAX START =====
  features: Feature[] = [
    { icon: 'timer',           label: 'Workout plans tailored to your needs' },
    { icon: 'desktop_windows', label: "Access to the client's panel" },
    { icon: 'play_circle',     label: 'Social media integration', highlighted: true },
    { icon: 'fitness_center',  label: 'Social media integration' },
    { icon: 'sports_mma',      label: 'Boxing & martial arts zone' },
    { icon: 'schedule',        label: 'Flexible class scheduling' },
    { icon: 'sports_tennis',   label: 'Indoor tennis & court sports' },
    { icon: 'event_note',      label: 'Personal training sessions' },
  ];

  private parallaxEl: HTMLElement | null = null;
  private ticking = false;

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateParallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private updateParallax(): void {
    if (!this.parallaxEl) return;
    const section = this.el.nativeElement as HTMLElement;
    const rect = section.getBoundingClientRect();
    const scrolled = -rect.top * 0.35;
    this.parallaxEl.style.transform = `translateY(${scrolled}px)`;
  }
  // ===== FEATURES AND PARALLAX END =====

}
// ===== COMPONENT CLASS END =====