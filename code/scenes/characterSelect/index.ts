import { k } from "../../kaboom";
import { readyToBattle } from "../../ws";
import { composers, Composer } from "../../composers"
import { P1, P2 } from "../../players";

const { loadSprite, layers, add, text, pos, height, width, sprite, layer, color, origin, rect, outline, area, go, onKeyPress, destroy } = k;

export function characterSelect(roomId: string, playerId: string) {
	console.log('Character select scene', roomId, playerId);

  layers([
    "bg",
    "ui",
  ], "ui");

  let selectedIndex = 0;
  let selectedComposer = addComposer(composers[selectedIndex]);

  add([
    sprite("character-select-bg"),
    layer("bg"),
  ]);

  add([
    text("Select composer", { size: 16, font: "sink" }),
    pos(width() / 2, height() / 2 - 120),
    origin("center")
  ]);

  const linkBgWidth = 200;
  const letsBattleBtn = add([
    "clickable",
    pos(width() / 2, height() / 2 + 165),
    origin("center"),
    rect(linkBgWidth, 30),
    color(0, 0, 0),
    outline(4, { r: 57, g: 255, b: 20}),
    area(),
  ]);
  const letsBattleBtnText = add([
    pos(width() / 2, height() / 2 + 165),
    origin("center"),
    text("LET'S BATTLE!", { size: 16, width: linkBgWidth - 30, font: "sink" }),
  ]);
  letsBattleBtn.onClick(() => {
    console.log("clicked lets battle");
    readyToBattle(roomId, playerId, selectedIndex);
    if (playerId === P2) {
      letsBattleBtnText.text = "Waiting P1...";
    } else {
      letsBattleBtnText.text = "Waiting P2...";
    }
  });

  const cycleRight = () => {
    destroy(selectedComposer.text);
    destroy(selectedComposer.sprite);
    selectedIndex++;
    if (selectedIndex >= composers.length) {
      selectedIndex = 0;
    }
    selectedComposer = addComposer(composers[selectedIndex]);
  }
  const cycleLeft = () => {
    destroy(selectedComposer.text);
    destroy(selectedComposer.sprite);
    selectedIndex--;
    if (selectedIndex < 0) {
      selectedIndex = composers.length - 1;
    }
    selectedComposer = addComposer(composers[selectedIndex]);
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
}

function addComposer(composer: Composer) {
  return {
    text: add([
      text(composer.name.toUpperCase(), { size: 32, font: "sink" }),
      pos(width() / 2, height() / 2 - 80),
      origin("center")
    ]),
    sprite: add([
      sprite(composer.sprite),
      origin("center"),
      pos(width() / 2, height() / 2 + 30),
    ]),
  };
}