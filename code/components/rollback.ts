/**
 * Component that makes game objects able to rollback.
 */

import { Key, GameObj } from "kaboom";

type PlayerId = string;
export type FrameInputs = Map<PlayerId, Key[]>;

let savedFrames: FrameData[] = [];
export type FrameData = {
  frame: number;
  inputs: Inputs;
  // references to all the game objects that existed at this frame
  gameObjects: object[];
}

export function handleRemoteInputs(frame: number, remoteInputs: Key[]) {
  const baseFrame = savedFrames.find(f => f.frame === (frame - 1));
  if (!baseFrame) {
    throw new Error(`No data for frame: ${frame}`);
    return;
  }

  const replayInputs = savedFrames.find(f => f.frame === frame).map(f => f.inputs);

  k.destroyAll();

  savedFrames = [];
  for (const gameObj of baseFrame.gameObjects) {
    gameObj.rollbackTo(baseFrame);
  }

  for (const inputs of replayInputs) {
    const gameObjs = k.get();
    gameObj.simulateForward(inputs);
  }
}

export function simulateFrame(inputs: Inputs) {
  const gameObjs = k.get();
  gameObj.simulateForward(inputs);
}

export default function replayable(tick?: (inputs: Inputs) => void) {
	const savedStates = new Map<number, any>();

	return {
    saveState(frame: number) {
      const state = JSON.parse(JSON.stringify(this));
      saveStates.set(frame, state);
    },
		rollbackTo(frame: number) {
			if (!savedStates.has(frame)) {
        // we are rolling back to before this object existed
        destroy(this);
        return;
      };

      const savedState = savedStates.get(frame);
      Object.assign(this, savedState);
      readd(this); // in case the object no longer exists
		},
    simulateForward(inputs: Inputs) {
      if (tick) {
        ticket()
      }
    },
	}
}