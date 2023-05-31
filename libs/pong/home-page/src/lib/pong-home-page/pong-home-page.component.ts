import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '@pong/data-access';

@Component({
  selector: 'pong-pong-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pong-home-page.component.html',
  styleUrls: ['./pong-home-page.component.scss'],
})
export class PongHomePageComponent {
  constructor(private testService: TestService) {}
}
