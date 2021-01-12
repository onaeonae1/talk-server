import WebSocket from 'ws';
import webSocketRouter from './webSocketRouter';
import './wsdb';

const ws = new WebSocket.Server({ port: 4001 });

ws.on('connection', (client) => {
  console.log('Websocket connected!!!');

  client.on('message', (message) => {
    webSocketRouter(JSON.parse(message), client);
  });

  client.on('close', (code) => {
    console.log(`Websocket closed!!!${code}`);
  });
});
