import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fitnesstracker } from './fitnesstracker';

describe('Fitnesstracker', () => {
  let component: Fitnesstracker;
  let fixture: ComponentFixture<Fitnesstracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fitnesstracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fitnesstracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
