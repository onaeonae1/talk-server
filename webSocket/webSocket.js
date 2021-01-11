import WebSocket from "ws";
import { authenticate } from "./webSocketController";
import webSocketRouter from "./webSocketRouter";

const ws = new WebSocket.Server({ port: 4001 });

ws.on("connection", (client) => {
  console.log("Websocket connected!!!");

  client.on("message", (message) => {
    webSocketRouter(JSON.parse(message), client);
  });

  client.on("close", (code, reason) => {
    console.log(code, reason);
  });
});
