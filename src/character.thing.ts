import { Sprite } from "pixi.js";

export class CharacterThing {
  id: string;
  sprite: Sprite;

  constructor(id: string, sprite: Sprite, x: number = 0, y: number = 0) {
    this.id = id;
    this.sprite = sprite;
    this.sprite.anchor.set(0.5);

    this.sprite.x = x;
    this.sprite.y = y;

    // please remove this, this is not what we want
    setInterval(() => {
      this.sprite.rotation += 0.04;
    }, 16);
  }
}
