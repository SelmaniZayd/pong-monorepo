import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PongGamePageComponent } from './pong-game-page.component';

describe('PongGamePageComponent', () => {
  let component: PongGamePageComponent;
  let fixture: ComponentFixture<PongGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PongGamePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PongGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
