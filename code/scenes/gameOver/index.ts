import { k } from "../../kaboom";
import { ws } from "../../ws";
import { nanoid } from "nanoid";

export function gameOver() {
	console.log('Game over scene');

  k.layers([
    "bg",
    "ui",
  ], "ui");

  k.add([
    k.sprite("battle-bg"),
    k.layer("bg"),
    k.area(),
  ]);
}