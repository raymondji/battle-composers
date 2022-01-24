import {Composer, Spell} from "./types";

export const Mozart: Composer = {
  name: "Mozart",
  sprite: "mozart",
  spells: [
    requiem,
  ],
};

const requiem = {
  name: "Requiem",
  sequence: ["Up", "Down", "Left", "Right"],
  position: "absolute",
  hitboxes: [
    {
      frames: 3,
      tiles: [
        { x: 1, y: 3},
        { x: 0, y: 5},
      ],
    },
    {
      frames: 3,
      tiles: [
        { x: 5, y: 6},
        { x: 1, y: 3},
      ],
    }
  ],
};