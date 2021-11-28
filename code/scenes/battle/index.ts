import { k } from "../../kaboom";

const { loadSprite, layers, add, text, pos, height, width, sprite, layer, color, origin, rect, outline, area, go, onKeyPress, destroy, solid } = k;

export type BattleArgs = {
  composerName: string;
}
export function battle(args: BattleArgs) {
	console.log('Battle scene', args.composerName);

  layers([
    "bg",
    "game",
    "ui",
  ], "game");

  add([
    sprite("battle-bg"),
    layer("bg"),
  ]);

  const composer = add([
    sprite(args.composerName),
    origin("bot"),
    solid(),
    area({ width: 90, height: 60 }),
    pos(80, height() / 2 + 130),
  ]);

  onKeyPress("left", () => {
    console.log("pressed left");
    composer.moveBy(-160, 0);
  });
  onKeyPress("right", () => {
    console.log("pressed right");
    composer.moveBy(160, 0);
  });
}