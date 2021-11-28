import { k } from "../../kaboom";
import { ws } from "../../ws";
import { nanoid } from "nanoid";

const { loadSprite, layers, add, text, pos, height, width, sprite, layer, color, cursor, origin, onHover, rect, outline, area, go } = k;

export function mainMenu() {
	console.log('Main menu scene');

  ws.onmessage = (msg) => {
	  console.log("players are ready", msg);
    // go("characterSelect");
  };

  layers([
    "bg",
    "ui",
  ], "ui");

  add([
    sprite("main-menu-bg"),
    layer("bg"),
    area()
  ]);

  onHover("clickable", () => {
    cursor("pointer");
  }, () => {
    cursor("default");
  });

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
    shareInstructions.text = "Copied to clipboard!";
  });
  add([
    pos(width() / 2, height() / 2),
    origin("center"),
    text(linkText, { size: 16, width: linkBgWidth - 30, font: "sink" }),
  ]);
  const shareInstructions = add([
    text("SHARE LINK WITH PLAYER 2", { size: 16, font: "sink" }),
    origin("center"),
    pos(width() / 2, height() / 2 + 50),
  ]);

  const howToBtn = add([
    "clickable",
    area({ width: 100, height: 100}),
    text("HOW TO PLAY", { size: 16, font: "sink" }),
    pos(20, height() - 36),
  ]);
  howToBtn.onClick(() => {
    console.log("clicked howto btn");
  });
}