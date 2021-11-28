/**
 * Component that makes game objects able to rollback.
 */

import { Key, GameObj } from "kaboom";

type PlayerId = string;
export type FrameInput = {
  playerId: PlayerId;
  keys: Key[];
}
export type FrameInputs = Map<PlayerId, Key[]>;

let savedFrames: FrameData[] = [];
// the current frame that we've played up to
let currFrame = 0;

onKeyPress("space", () => {
    froggy.jump()
})
onKeyPress("space", () => {
    froggy.jump()
})
onKeyPress("space", () => {
    froggy.jump()
})

export type FrameData = {
  frame: number;
  inputs: FrameInputs;
  // references to all the game objects that existed at this frame
  gameObjects: object[];
}

// wait what if the remote player is AHEAD of the local player in frame #?
// hmmm....
//

// every input is associated with a player and a frame


// on every frame N,
// 1.
// look through our frame buffer
// if any frame has all inputs available
// replay from that frame.
// 2.
// take all the inputs that were entered on frame N
// and queue them for frame N+2
// 3. 
// if any inputs are scheduled for frame N, play them

// local inputs advance the current frame number, UNLESS we're more than X frames ahead. In that case, just pause and don't take any more local inputs
export function handleLocalInputs(frame: number, inputs: Key[]) {
  const frameInputs: FrameInputs = new Map();
  frameInputs.set(localPlayerId, )

  savedFrames.push({
    frame,
    inputs: new Map
  })
}

// remote inputs replay existing frames and never change the 
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
    simulateFrame(inputs);
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