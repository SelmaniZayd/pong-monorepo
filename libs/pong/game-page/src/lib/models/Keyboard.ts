export class Keyboard {
  public static readonly keys = new Map<string, boolean>();

  public static initialize() {
    document.addEventListener('keydown', Keyboard.keyDown);
    document.addEventListener('keyup', Keyboard.KeyUp);
  }

  public static keyDown(e: KeyboardEvent) {
    Keyboard.keys.set(e.code, true);
  }

  public static KeyUp(e: KeyboardEvent) {
    Keyboard.keys.set(e.code, false);
  }
}
