import { k } from "../../kaboom";
import { ws } from "../../ws";

const { loadSprite, layers, add, text, pos, height, width, sprite, layer, color, origin, rect, outline, area, go, onKeyPress, destroy } = k;

const COMPOSER_NAMES = ["mozart", "beethoven"];

export function characterSelect() {
	console.log('Character select scene');

  layers([
    "bg",
    "ui",
  ], "ui");

  let selectedIndex = 0;
  let selectedComposer = addComposer(COMPOSER_NAMES[selectedIndex]);

  add([
    sprite("character-select-bg"),
    layer("bg"),
  ]);

  add([
    text("Select composer", { size: 16, font: "sink" }),
    pos(width() / 2, height() / 2 - 120),
    origin("center")
  ]);

  const letsBattleText = `LET'S BATTLE!`;
  const linkBgWidth = 200;
  const copyLinkBtn = add([
    "clickable",
    pos(width() / 2, height() / 2 + 165),
    origin("center"),
    rect(linkBgWidth, 30),
    color(0, 0, 0),
    outline(4, { r: 57, g: 255, b: 20}),
    area(),
  ]);
  copyLinkBtn.onClick(() => {
    console.log("clicked lets battle");
    go("battle", { composerName: COMPOSER_NAMES[selectedIndex] });
  });
  add([
    pos(width() / 2, height() / 2 + 165),
    origin("center"),
    text("LET'S BATTLE!", { size: 16, width: linkBgWidth - 30, font: "sink" }),
  ]);

  const cycleRight = () => {
    destroy(selectedComposer.text);
    destroy(selectedComposer.sprite);
    selectedIndex++;
    if (selectedIndex >= COMPOSER_NAMES.length) {
      selectedIndex = 0;
    }
    selectedComposer = addComposer(COMPOSER_NAMES[selectedIndex]);
  }
  const cycleLeft = () => {
    destroy(selectedComposer.text);
    destroy(selectedComposer.sprite);
    selectedIndex--;
    if (selectedIndex < 0) {
      selectedIndex = COMPOSER_NAMES.length - 1;
    }
    selectedComposer = addComposer(COMPOSER_NAMES[selectedIndex]);
  }
  onKeyPress("right", () => {
    console.log("right pressed");
    cycleRight();
  });
  onKeyPress("left", () => {
    console.log("left pressed");
    cycleLeft();
  })
  const rightBtn = add([
    "clickable",
    area(),
    sprite("button-right"),
    origin("center"),
    pos(width() / 2 + 120, height() / 2 + 60),
  ]);
  rightBtn.onClick(() => {
    console.log("clicked right button");
    cycleRight();
  });
  const leftBtn = add([
    "clickable",
    area(),
    sprite("button-left"),
    origin("center"),
    pos(width() / 2 - 120, height() / 2 + 60),
  ]);
  leftBtn.onClick(() => {
    console.log("clicked left button");
    cycleLeft();
  });

  const howToBtn = add([
    "clickable",
        area(),
    text("HOW TO PLAY", { size: 16, font: "sink" }),
    pos(20, height() - 36),
  ]);
  howToBtn.onClick(() => {
    console.log("clicked howto btn");
  });
}

function addComposer(name: string) {
  return {
    text: add([
      text(name.toUpperCase(), { size: 32, font: "sink" }),
      pos(width() / 2, height() / 2 - 80),
      origin("center")
    ]),
    sprite: add([
      sprite(name),
      origin("center"),
      pos(width() / 2, height() / 2 + 30),
    ]),
  };
}