import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TestimonialModel {
  name: string;
  date: string;
  content: string;
  rating: number;
  image: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}
@Component({
  selector: 'app-testimonial',
  imports: [CommonModule],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css',
})
export class Testimonial  {
// ===== TESTIMONIALS AND FAQ DATA START =====
  testimonials: TestimonialModel[] = [
    {
      name: 'Deepa Khan',
      date: 'May 29, 2024',
      content: 'When I joined, I was nervous. But the trainers never made me feel behind or out of place. They understood my goals and gave me the space to grow.',
      rating: 4,
      image: 'assets/user1.jpg'
    },
    {
      name: 'Rohit Mehra',
      date: 'May 18, 2025',
      content: 'I wasn\'t sure if gym culture was for me. But Hyperfit changed that. The space is welcoming, the people are kind, and the trainers actually listen before they speak.',
      rating: 3,
      image: 'assets/user2.jpg'
    },
    {
      name: 'Ananya Reddy',
      date: 'June 2, 2025',
      content: 'I\'ve tried other places before, but this is the first time I felt seen. No pressure, no comparison — just progress that feels real.',
      rating: 5,
      image: 'assets/user3.jpg'
    }
  ];

  faqs = [
    {
      question: 'I\'m a complete beginner. Can I still join Hyperfit?',
      answer: 'Absolutely. We welcome all fitness levels. Our trainers will guide you at your own pace — no pressure, no judgment.',
      open: false
    },
    {
      question: 'Do I need to bring anything for my first session?',
      answer: 'Just bring comfortable workout clothes, a water bottle, and a positive attitude. We provide all the equipment you\'ll need.',
      open: false
    },
    {
      question: 'Are personal training sessions included in the plans?',
      answer: 'Yes! All our membership plans include personal training sessions. The number varies by plan - from 1 session per month in the Starter plan to 4 sessions per month in the Commit plan.',
      open: false
    },
    {
      question: 'What kind of group classes do you offer?',
      answer: 'We offer a variety of group classes including HIIT, yoga, strength training, cycling, and flexibility sessions. Check our schedule for the full list of weekly classes.',
      open: false
    },
    {
      question: 'Can I freeze or pause my membership if needed?',
      answer: 'Yes, we understand life happens. You can freeze your membership for up to 2 months per year with advance notice.',
      open: false
    },
    {
      question: 'How do I cancel my membership?',
      answer: 'You can cancel your membership at any time with 30 days notice. Just contact us via email or speak to our front desk team.',
      open: false
    }
  ];

  

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }
  // ===== FAQ CONTROL METHODS END =====
}
