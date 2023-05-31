import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PongHomePageComponent } from './pong-home-page.component';

describe('PongHomePageComponent', () => {
  let component: PongHomePageComponent;
  let fixture: ComponentFixture<PongHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PongHomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PongHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
