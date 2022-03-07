import { RollbackGameEngine } from "../../rollback";
import { ws } from "../../ws";

export function initNetworkListeners(engine: RollbackGameEngine) {
  console.log("Battle init network: ");
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    
    switch (message.type) {
      case "remoteInputs":
        engine.addRemoteInputs(message.frame, message.playerId, message.keysDown);
        break;
      default:
        console.log("Client received unknown message", message);
        break;
    }
  };
}

export function forwardLocalInputs(roomId: string, localPlayerId: string, keysDown: string[], frame: number) {
  console.log(`Forwarding local inputs, roomId: ${roomId}, playerId: ${localPlayerId}, keysDown: ${keysDown}, frame: ${frame}`);
  var msg = {
    type: "forwardInputs",
    roomId,
    localPlayerId,
    keysDown,
    frame,
  };

  ws.send(JSON.stringify(msg));
}
