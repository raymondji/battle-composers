import { GameEngine } from "../engine"

export class LocalGameEngine<G, I> implements GameEngine {
  private localFrame: number;
  private localPlayerId: string;
  private gameState: G;

  constructor(
    private getLocalInputs: () => I,
    private localPlayerId: string,
    private render: (gameState: G) => void,
    private simulate: (gameState: G, inputs: Map<string, I>) => G,
    initialGameState: G
  ) {
    this.localFrame = 0;
    this.localPlayerId = localPlayerId;
  }

  tick() {
    this.localFrame++;
    const inputs = new Map<string, I>();
    inputs.set(this.localPlayerId, this.getLocalInputs())
    this.gameState = this.simulate(this.gameState, inputs);
    this.render(this.gameState);
  }
}