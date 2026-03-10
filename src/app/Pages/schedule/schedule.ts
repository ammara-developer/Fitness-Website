import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
interface GymClass {
  name: string;
  trainer: string;
  type: string;
}
interface TimeSlot {
  time: string;
  short: string;
}
interface ScheduleEntry { time: string; day: string; class: GymClass; }
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.html',
  styleUrls: ['./schedule.css']
})
export class Schedule implements AfterViewInit {
  @ViewChild('scheduleSection') scheduleSection?: ElementRef<HTMLElement>;
  @ViewChild('aboutSection') aboutSection?: ElementRef<HTMLElement>;

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

    // Observe the schedule section for the schedule/table animations.
    // Fall back to observing the about section if scheduleSection isn't available.
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
}
