import { k } from "../../kaboom";
import { initNetworkListeners, joinRoom } from "../../ws";
import { nanoid } from "nanoid";
import { P1, P2 } from "../../players";

function getRoomId(): string {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("r");
}

export function mainMenu() {
	console.log('Main menu scene');
  let roomId = getRoomId();
  let player = P2;
  if (roomId === null) {
    player = P1;
    roomId = nanoid();
  }

  k.layers([
    "bg",
    "ui",
  ], "ui");
  k.add([
    k.sprite("main-menu-bg"),
    k.layer("bg"),
    k.area()
  ]);

  joinRoom(roomId);
  
  if (player == P1) {
    p1MainMenu(roomId);
  } else {
    p2MainMenu(roomId);
  }
}

function p1MainMenu(roomId: string) {
  initNetworkListeners(P1, roomId);
  k.onHover("clickable", () => {
    k.cursor("pointer");
  });

  k.add([
    k.text("BATTLE COMPOSERS", { size: 36, font: "sink" }),
    k.pos(k.width() / 2, k.height() / 2 - 60),
    k.origin("center")
  ]);

  const linkText = `https://battle-composers.raymondji.repl.co/?r=${roomId}`;
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

function p2MainMenu(roomId: string) {
  initNetworkListeners(P2, roomId);
  
  k.add([
    k.text("BATTLE COMPOSERS", { size: 36, font: "sink" }),
    k.pos(k.width() / 2, k.height() / 2 - 60),
    k.origin("center")
  ]);
  k.add([
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
    k.text(`Room Id: ${roomId}`, { size: 16, width: 500, font: "sink" }),
  ]);

  const shareInstructions = k.add([
    k.text("Welcome P2, loading...", { size: 16, font: "sink" }),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2 + 50),
  ]);
}