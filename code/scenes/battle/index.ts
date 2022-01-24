import { k } from "../../kaboom";
import { composers, Composer } from "../../composers"
import { Key } from "kaboom";
import { RollbackGameEngine } from "../../rollback";
import { P1, P2 } from "../../players";
import { initNetworkListeners, forwardLocalInputs } from "./network";

const { scale, loadSprite, layers, add, text, pos, height, width, sprite, layer, color, origin, rect, outline, area, go, onKeyPress, destroy, solid, destroyAll} = k;

export type BattleArgs = {
  p1ComposerIndex: number;
  p2ComposerIndex: number;
  playerId: string;
  roomId: string;
}

export function battle(args: BattleArgs) {
	console.log('Battle scene', args);
  const p1Composer = composers[args.p1ComposerIndex];
  const p2Composer = composers[args.p2ComposerIndex];

  layers([
    "bg",
    "game",
    "ui",
  ], "game");

  add([
    sprite("battle-bg"),
    layer("bg"),
  ]);

  startGameLoop(args.roomId, args.playerId, p1Composer, p2Composer);
}

interface PlayerState {
  posX: number;
  posY: number;
  health: number;
  sprite: string;
}

interface GameState {
  p1State: PlayerState,
  p2State: PlayerState,
}

function startGameLoop(roomId: string, localPlayerId: string, p1Composer: Composer, p2Composer: Composer) {
  const engine = new RollbackGameEngine<GameState, Key[]>(
    localPlayerId,
    getLocalInputs,
    render,
    simulate,
    (inputs: Key[], frame: number) => {
      console.log("Sending local inputs, frame", frame, "inputs", inputs);
      forwardLocalInputs(roomId, localPlayerId, inputs, frame) 
    },
    {
      p1State: {
        posX: 80,
        posY: 300,
        health: 100,
        sprite: p1Composer.sprite,
      },
      p2State: {
        posX: 480,
        posY: 300,
        health: 100,
        sprite: p2Composer.sprite,
      },
    }
  );

  initNetworkListeners(engine);
  k.onUpdate(() => {
    engine.tick();
  });
}

function render(gameState: GameState) {
  destroyAll("rollbackSafe");
  // console.log("Rendering gameState: ", gameState);
  
  const p1ComposerGameObj = add([
    "rollbackSafe",
    sprite(gameState.p1State.sprite),
    origin("bot"),
    solid(),
    area({ width: 90, height: 60 }),
    pos(gameState.p1State.posX, gameState.p1State.posY),
  ]);

  const p2ComposerGameObj = add([
    "rollbackSafe",
    sprite(gameState.p2State.sprite),
    origin("bot"),
    solid(),
    area({ width: 90, height: 60 }),
    pos(gameState.p2State.posX, gameState.p2State.posY),
  ]);
}

function simulate(gameState: GameState, inputs: Map<string, Key[]>): GameState {
  // console.log("Simulating, starting state: ", gameState, "inputs: ", inputs.entries());
  const p1Inputs = inputs.get(P1) || [];
  const p2Inputs = inputs.get(P2) || [];
  
  const nextGameState = JSON.parse(JSON.stringify(gameState));
  for (const input of p1Inputs) {
    if (input === "a") {
      nextGameState.p1State.posX -= 160;
    }
    if (input === "d") {
      nextGameState.p1State.posX += 160;
    }
    if (input === "w") {
      nextGameState.p1State.posY -= 60;
    }
    if (input === "s") {
      nextGameState.p1State.posY += 60;
    }
  }
  for (const input of p2Inputs) {
    if (input === "a") {
      nextGameState.p2State.posX -= 160;
    }
    if (input === "d") {
      nextGameState.p2State.posX += 160;
    }
    if (input === "w") {
      nextGameState.p2State.posY -= 60;
    }
    if (input === "s") {
      nextGameState.p2State.posY += 60;
    }
  }

  return nextGameState;
}

function getLocalInputs(): Key[] {
  const inputs = [];
  const allowedInputs: Key[] = [
    'left',
    'right',
    'up',
    'down',
    'w',
    'a',
    's',
    'd',
  ];

  allowedInputs.forEach((key) => {
    if (k.isKeyPressed(key)) {
      inputs.push(key);
    }
  });

  return inputs;
}