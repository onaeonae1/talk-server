import WebSocket from "ws";
import webSocketRouter from "./webSocketRouter";

const ws = new WebSocket.Server({ port: 4001 });

export let socketConnectedList = [];

ws.on("connection", (client) => {
  client.userId = "1112";
  console.log("Websocket connected!!!");
  client.on("message", function (message) {
    console.log("Received:", message);
  });

  console.log(ws.clients.size);
  client.on("close", (code, reason) => {
    console.log("closed" + client);
    console.log(ws.clients.size);
  });
});
