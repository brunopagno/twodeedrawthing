import { Application, Assets, Sprite, Ticker } from "pixi.js";
import { CharacterThing } from "./character.thing";

export class SceneThing {
  app: Application;
  backgroundTexturePath: string;
  background: Sprite | undefined;
  characters: Record<string, CharacterThing>;
  timeAcc: number;
  charactersOnScreen: boolean = false;

  constructor(app: Application, backgroundTexturePath: string) {
    this.app = app;
    this.backgroundTexturePath = backgroundTexturePath;
    this.characters = {};
    this.timeAcc = 0;
  }

  addCharacter(character: CharacterThing) {
    this.characters[character.id] = character;
  }

  update(time: Ticker): any {
    this.timeAcc += time.deltaTime;
    if (this.timeAcc >= 100) {
      if (!this.charactersOnScreen) {
        this.charactersOnScreen = true;
        Object.values(this.characters).forEach((character) => {
          this.app.stage.addChild(character.sprite);
        });
      }
    }
  }

  /**
   * causes all the resources defined in the scene
   * to be added to the app
   */
  async enter() {
    await Assets.load([
      {
        alias: "background",
        src: this.backgroundTexturePath,
      },
    ]);

    this.background = Sprite.from("background");
    this.background.anchor.set(0.5);

    this.background.height = this.app.screen.height * 1.2;
    this.background.scale.x = this.background.scale.y;

    this.background.x = this.app.screen.width / 2;
    this.background.y = this.app.screen.height / 2;

    this.app.stage.addChild(this.background);
  }

  /**
   * removes all resources from the app
   */
  leave() {
    if (this.background) {
      this.app.stage.removeChild(this.background);
    }
  }
}
