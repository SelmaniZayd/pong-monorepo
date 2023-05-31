import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PongUiComponent } from './pong-ui.component';

describe('PongUiComponent', () => {
  let component: PongUiComponent;
  let fixture: ComponentFixture<PongUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PongUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PongUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
