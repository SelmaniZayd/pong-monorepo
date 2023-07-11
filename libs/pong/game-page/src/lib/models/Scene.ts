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
  // Determines the speed of the ball
  private ballVelocity = 10;
  // Determines the speed which the player can move his bar
  private barVelocity = 6;
  private direction: 1 | -1 = 1;
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

    Ticker.shared.add(this._updateBar1, this);
    Ticker.shared.add(this._updateBall, this);
  }

  private _updateBall(deltaTime: number) {
    const ball = this.ball.getBounds();
    const p1Bar = this.p1Bar.getBounds();
    const p2Bar = this.p2Bar.getBounds();
    // Is colliding with player 1's bar
    const collWithBar1 =
      ball.x < p1Bar.x + p1Bar.width &&
      ball.y > p1Bar.y - ball.height &&
      ball.y < p1Bar.y + p1Bar.height;

    // Is colliding with player 2's bar
    const collWithBar2 =
      ball.x + ball.width > p2Bar.x &&
      ball.y > p1Bar.y - ball.height &&
      ball.y < p1Bar.y + p1Bar.height;

    const collRightWall = ball.x > this.screenWidth - ball.width;
    const collLeftWall = ball.x <= 0;

    // If ball collides with a bar change direction
    this.direction *= collWithBar1 || collWithBar2 ? -1 : 1;

    if (collLeftWall) {
      console.log('Game done');
      Ticker.shared.stop();
    }

    this.ball.x += this.ballVelocity * deltaTime * this.direction;
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
