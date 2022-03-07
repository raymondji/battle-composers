const TILE_WIDTH = 162;
const TILE_HEIGHT = 66;

export function mapCoordsToPos(coordX: number, coordY: number) {
  return {
    posX: TILE_WIDTH/2 + coordX * TILE_WIDTH,
    posY: TILE_HEIGHT/2 + coordY * TILE_HEIGHT,
  };
}

export function updatePlayerPos(playerState: PlayerState, inputs: Key[]) {
  for (const input of inputs) {
    if (input === "a") {
      playerState.coordX = Math.max(playerState.coordX - 1, 0);
    }
    if (input === "d") {
      playerState.posX = Math.min(playerState.coordX + 1, 5);
    }
    if (input === "w") {
      playerState.posY = Math.max(playerState.coordY - 1, 0);
    }
    if (input === "s") {
      playerState.posY = Math.min(playerState.coordY + 1, 5);
    }
  }
}