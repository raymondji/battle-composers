import { k } from "../../kaboom";
import { composers, Composer } from "../../composers"
import { Key } from "kaboom";
import { RollbackGameEngine } from "../../rollback";
import { P1, P2 } from "../../players";
import { updatePlayerPos, mapCoordsToPos } from "./movement";
import { initNetworkListeners, forwardLocalInputs } from "./network";

const { scale, loadSprite, layers, add, text, pos, height, width, sprite, layer, color, origin, rect, outline, area, go, onKeyPress, destroy, solid, destroyAll} = k;

export type BattleArgs = {
  p1ComposerIndex: number;
  p2ComposerIndex: number;
  playerId: string;
  roomId: string; // if empty string, offline debug mode
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
  id: P1 | P2;
  coordX: number;
  coordY: number;
  health: number;
  sprite: string;
}

interface GameState {
  p1State: PlayerState,
  p2State: PlayerState,
}

function startNetworkedGameEngine(localPlayerId: string, roomId: string): GameEngine {
  
}

function startLocalGameEngine(localPlayerId: string): GameEngine {
  
}

function startGameLoop(initGameEngine: () => GameEngine, roomId: string, localPlayerId: string, p1Composer: Composer, p2Composer: Composer) {
  const engine = new RollbackGameEngine<GameState, Key[]>(
    localPlayerId,
    getLocalInputs,
    render,
    simulate,
    (inputs: Key[], frame: number) => {
      console.log("Sending local inputs, frame", frame, "inputs", inputs);
      if (roomId != "") {
        forwardLocalInputs(roomId, localPlayerId, inputs, frame)   
      }
    },
    {
      p1State: {
        id: P1,
        coordX: 0,
        coordY: 2,
        health: 100,
        sprite: p1Composer.sprite,
      },
      p2State: {
        id: P2,
        coordX: 5,
        coordY: 2,
        health: 100,
        sprite: p2Composer.sprite,
      },
    }
  );

  if (roomId != "") {
    initNetworkListeners(engine);  
  }
  
  k.onUpdate(() => {
    engine.tick();
  });
}

function renderPlayer(playerState: PlayerState) {
  const {posX, posY} = mapCoordsToPos(playerState.posX, playerState.posY);
  add([
    "rollbackSafe",
    sprite(playerState.sprite),
    origin("bot"),
    solid(),
    area({ width: 90, height: 60 }),
    pos(posX, posY),
  ]);
}

function render(gameState: GameState) {
  destroyAll("rollbackSafe");

  renderPlayer(gameState.p1State);
  renderPlayer(gameState.p2State);
}

function simulate(gameState: GameState, inputs: Map<string, Key[]>): GameState {
  // console.log("Simulating, starting state: ", gameState, "inputs: ", inputs.entries());
  const p1Inputs = inputs.get(P1) || [];
  const p2Inputs = inputs.get(P2) || [];
  
  const nextGameState = JSON.parse(JSON.stringify(gameState));
  updatePlayerPos(nextGameState.p1State, p1Inputs);
  updatePlayerPos(nextGameState.p2State, p2Inputs);
  return nextGameState;
}

function getLocalInputs(): Key[] {
  const inputs: Key[] = [];
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