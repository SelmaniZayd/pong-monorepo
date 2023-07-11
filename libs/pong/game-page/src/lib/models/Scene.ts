import {
  Container,
  FederatedPointerEvent,
  Graphics,
  Sprite,
  Ticker,
} from 'pixi.js';
import { Keyboard } from './Keyboard';

export class Scene extends Container {
  private ball: Graphics;
  private clampyVelocity = 5;
  private direction: 1 | -1 = 1;
  private barVelocity = 6;
  private p1Bar: Graphics;
  private p2Bar: Graphics;

  constructor(public screenWidth: number, public screenHeight: number) {
    super();
    Keyboard.initialize();
    this.ball = this.getBall();
    this.p1Bar = this.getBar(20, this.screenHeight / 2 - 25);
    this.p2Bar = this.getBar(this.screenWidth - 30, this.screenHeight / 2 - 25);
    this.addChild(this.ball);
    this.addChild(this.p1Bar);
    this.addChild(this.p2Bar);

    Ticker.shared.add(this._updateBall, this);
    Ticker.shared.add(this._updateBar1, this);
  }

  private _updateBall(deltaTime: number) {
    const ball = this.ball.getBounds();
    const p1Bar = this.p1Bar.getBounds();
    const p2Bar = this.p2Bar.getBounds();
    const collWithBar1 =
      ball.x <= p1Bar.x + p1Bar.width &&
      ball.y > p1Bar.y - ball.height &&
      ball.y < p1Bar.y + p1Bar.height;

    const collWithBar2 =
      ball.x + ball.width >= p2Bar.x &&
      ball.y > p1Bar.y - ball.height &&
      ball.y < p1Bar.y + p1Bar.height;

    if (
      ball.x > this.screenWidth - ball.width ||
      ball.x <= 0 ||
      collWithBar1 ||
      collWithBar2
    ) {
      this.direction *= -1;
    }

    this.ball.x += this.clampyVelocity * deltaTime * this.direction;
  }

  private _updateBar1(deltaTime: number) {
    const p1Bar = this.p1Bar.getBounds();
    if (Keyboard.keys.get('KeyW')) {
      // up
      const isTopMax = p1Bar.y <= 0;
      if (isTopMax) return;
      this.p1Bar.y -= deltaTime * this.barVelocity;
    } else if (Keyboard.keys.get('KeyS')) {
      // down
      const isBottomMax = p1Bar.y + p1Bar.height >= this.screenHeight;
      if (isBottomMax) return;
      this.p1Bar.y += deltaTime * this.barVelocity;
    }
  }

  private getBall() {
    const ball = new Graphics();
    ball.beginFill('red');
    ball.drawCircle(this.screenWidth / 2, this.screenHeight / 2, 10);
    ball.endFill();
    return ball;
  }

  private getBar(x: number, y: number) {
    const bar = new Graphics();
    bar.beginFill('white');
    bar.drawRect(x, y, 10, 50);
    bar.endFill();
    return bar;
  }
}
