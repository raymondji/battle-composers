import { k } from "../../kaboom";
import { nanoid } from "nanoid";

const { loadSprite, layers, add, text, pos, height, width, sprite, layer, color, origin, rect, outline, area, onUpdate, onHover, cursor } = k;

// load assets
loadSprite("background", "sprites/bg/main-menu.png");

export function mainMenu() {
	console.log('Main menu scene');

  layers([
    "bg",
    "ui",
  ], "ui");

  // Set some global defaults
  onHover("clickable", (c) => {
    console.log("hovering");
    cursor("pointer")
  });

  add([
    sprite("background"),
    layer("bg"),
  ]);

  add([
    text("BATTLE COMPOSERS", { size: 36, font: "sink" }),
    pos(width() / 2, height() / 2 - 60),
    origin("center")
  ]);

  const linkText = `https://battle-composers.raymondji.repl.co/?r=${nanoid()}`;
  const linkBgWidth = 840;
  const copyLinkBtn = add([
    "clickable",
    pos(width() / 2, height() / 2),
    origin("center"),
    rect(linkBgWidth, 50),
    color(0, 0, 0),
    outline(4),
    area(),
  ]);
  copyLinkBtn.onClick(() => {
    console.log("clicked copy link", linkText);
    navigator.clipboard.writeText(linkText);
  });

  add([
    pos(width() / 2, height() / 2),
    origin("center"),
    text(linkText, { size: 16, width: linkBgWidth - 30, font: "sink" }),
  ]);
  add([
    text("SHARE LINK WITH PLAYER 2", { size: 16, font: "sink" }),
    origin("center"),
    pos(width() / 2, height() / 2 + 50),
  ]);

  const howToBtn = add([
    "clickable",
        area(),
    text("HOW TO PLAY", { size: 16, font: "sink" }),
    pos(20, height() - 36),
  ]);
}