import WebSocket from "ws";
const ws = new WebSocket.Server({ port: 4001 });
ws.on("connection", (client) => {
  console.log(client);
  client.on("message", function (message) {
    console.log("Received:", message);
  });
});

ws.on("close", (client) => {
  console.log("Closed");
});
