import { k } from "./kaboom";
const protocol = location.protocol === "https:" ? "wss" : "ws";

export const ws = new WebSocket(`${protocol}://${location.host}/multiplayer`);

export const wsReady = new Promise((resolve, reject) => {
  ws.addEventListener("open", () => {
    console.log(`websocket connected`);
    resolve(true);
  });
});

export function initNetworkListeners(playerId: string, roomId: string) {
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Received msg: ", message);
    
    switch (message.type) {
      case "allJoined":
        k.go("characterSelect", roomId, playerId);
        break;
      case "startBattle":
        k.go("battle", {
          p1ComposerIndex: message.p1ComposerIndex,
          p2ComposerIndex: message.p2ComposerIndex,
          roomId,
          playerId,
        });
        break;
      case "remoteInputs":
        break; // ignore
      default:
        console.log("Client received unknown message", message);
        break;
    }
  };
}

export function joinRoom(roomId: string) {
  console.log(`Joining room, roomId: ${roomId}`);
  var msg = {
    type: "join",
    roomId,
  };

  ws.send(JSON.stringify(msg));
}

export function readyToBattle(roomId: string, playerId: string, composerIndex: number) {
  console.log(`Ready to battle, roomId: ${roomId}, playerId: ${playerId}, composerIndex: ${composerIndex}`);
  var msg = {
    type: "ready",
    roomId,
    playerId,
    composerIndex,
  };

  ws.send(JSON.stringify(msg));
}

