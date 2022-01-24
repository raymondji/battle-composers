# Rollback concepts

Basic idea is this:

RollbackSafeState is some state that we want to be able to rollback when we receive remote input. This is usually state for a specific Kaboom game object.


For each frame, we always run the local inputs first then the remote inputs.

Rules:
- Each kaboom object that is rollback-able should have a function CreateGameObj(rollbackSafeState): KaboomGameObj
- Each kaboom object also needs to define a "tick" function that A) saves a new rollBackSafeState and updates the kaboom game obj.
- Each kaboom object that is rollback-able should respond to "tick" events, and avoid using OnUpdate

The local game simulation is on a frame F_L.
The last received remote frame is F_R.

If F_L - F_R > threshold, we pause the local game simulation to let the remote simulation catch up / allow the remote inputs to reach us.

The local game simulation keeps track of game state GSc, GSp1, GSp2, ...,

GSc := confirmed frame
GSpN := predicted frames

The latest predicted frame is what is rendered to the screen.

For each GS, we track the local and remote inputs for that frame.

When receive remote inputs for F_R, all frames < F_R are considered confirmed and no longer predicted. If F_R is behind F_L, then we roll back to GSc and replay GSp1, GSp2, ...

If F_R is ahead of F_L, then we just store those remote inputs until we need them.

GS := an array of RollbackSafeState

To rollback:
- we destroy all kaboom game objects
- we recreate them from RollbackSafeState
- we run the "tick" event each game object N times until we are caught up to the latest predicted frame
- we delete saved gamestates for all confirmed frames

Assumptions:
- remote frame inputs arrive in order. If we receive remote input for frame F_R, then all frames before F_R are confirmed

// on every frame N,
// 1.
// look through our frame buffer
// if any frame F has all inputs available
// replay from that frame. Throw away all frames < F
// 2.
// take all the inputs that were entered on frame N
// and queue them for frame N+2
// 3. 
// if any inputs are scheduled for frame N, simulate them and get frame N+1