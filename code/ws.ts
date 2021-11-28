const protocol = location.protocol === "https:" ? "wss" : "ws";
export const ws = new WebSocket(`${protocol}://${location.host}/multiplayer`);
