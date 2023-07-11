import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application } from 'pixi.js';
import { Scene } from '../models/Scene';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pong-game-page.component.html',
  styleUrls: ['./pong-game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PongGamePageComponent implements OnInit {
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this._initPixi();
    });
  }

  private _initPixi() {
    const app = new Application({
      view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
      resolution: window.devicePixelRatio ?? 1,
      autoDensity: true,
      backgroundColor: 'black',
      width: 640,
      height: 480,
    });

    const myScene = new Scene(app.screen.width, app.screen.height);
    app.stage.addChild(myScene);
  }
}
