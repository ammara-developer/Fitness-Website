import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Loader } from '../loader';
import { LoaderService } from '../loader.service';

describe('Loader', () => {
  let component: Loader;
  let fixture: ComponentFixture<Loader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loader],
      providers: [LoaderService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});