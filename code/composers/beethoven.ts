import {Composer, Spell} from "./types";

export const Beethoven: Composer = {
  name: "Beethoven",
  sprite: "beethoven",
  spells: [
    furElise,
  ],
};

const furElise = {
  name: "Fur Elise",
  sequence: ["Down", "Down", "Right", "Right"] as const,
  position: "absolute",
  hitboxes: [
    {
      frames: 3,
      tiles: [
        { x: 1, y: 0},
      ],
    },
    {
      frames: 3,
      tiles: [
        { x: 2, y: 0},
      ],
    },
    {
      frames: 3,
      tiles: [
        { x: 3, y: 0},
      ],
    },
  ],
};