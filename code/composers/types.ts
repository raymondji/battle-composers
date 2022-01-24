export interface Composer {
  name: string; // unique
  sprite: string;
  spells: Spell[];
}

export interface Spell {
  name: string; // unique
  sequence: Direction[];
  hitboxes: Hitbox[];
  // whether the hitboxes are relative to the character or absolute on the grid
  position: "absolute" | "relative"; 
}

export interface Hitbox {
  frames: number;
  tiles: Tile[];
}

interface Tile {
  x: number;
  y: number;
}

type Direction = "Up" | "Down" | "Left" | "Right";
