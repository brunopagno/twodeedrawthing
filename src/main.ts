import "./style.css";

import { Application, Assets, Sprite } from "pixi.js";
import { SceneThing } from "./scene.thing";
import { CharacterThing } from "./character.thing";

const app = new Application();

app.init({ background: "#000", resizeTo: window }).then(async () => {
  document.querySelector("#app")!.appendChild(app.canvas);

  const fishTexture = await Assets.load(
    "https://pixijs.com/assets/tutorials/fish-pond/fish1.png",
  );
  const fishSprite = new Sprite(fishTexture);

  const sceneThing = new SceneThing(
    app,
    "https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg",
  );
  sceneThing.addCharacter(
    new CharacterThing(
      "fishy",
      fishSprite,
      app.screen.width / 2,
      app.screen.height / 2,
    ),
  );
  await sceneThing.enter();

  app.ticker.add((time) => sceneThing.update(time));
});
