import WebSocket from "ws";

const ws = new WebSocket.Server({ port: 3002 });
ws.on("connection", (client) => {
  client.send("Hello! I am a server.");
  client.on("message", function (message) {
    console.log("Received:", message);
  });
});
