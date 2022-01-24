import { k } from "../../kaboom";
import { ws } from "../../ws";
import { nanoid } from "nanoid";

export function loading() {
	console.log('Main menu scene');

  k.layers([
    "bg",
    "ui",
  ], "ui");

  k.add([
    k.sprite("main-menu-bg"),
    k.layer("bg"),
    k.area()
  ]);

  k.onHover("clickable", () => {
    k.cursor("pointer");
  });

  k.add([
    k.text("BATTLE COMPOSERS", { size: 36, font: "sink" }),
    k.pos(k.width() / 2, k.height() / 2 - 60),
    k.origin("center")
  ]);

  const linkText = `https://battle-composers.raymondji.repl.co/?r=${nanoid()}`;
  const linkBgWidth = 840;
  const copyLinkBtn = k.add([
    "clickable",
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
    k.rect(linkBgWidth, 50),
    k.color(0, 0, 0),
    k.outline(4),
    k.area(),
  ]);
  copyLinkBtn.onClick(() => {
    console.log("clicked copy link", linkText);
    navigator.clipboard.writeText(linkText);
    shareInstructions.text = "Copied to clipboard! Waiting for P2 to join...";
  });
  k.add([
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
    k.text(linkText, { size: 16, width: linkBgWidth - 30, font: "sink" }),
  ]);
  const shareInstructions = k.add([
    k.text("SHARE LINK WITH PLAYER 2", { size: 16, font: "sink" }),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2 + 50),
  ]);
}