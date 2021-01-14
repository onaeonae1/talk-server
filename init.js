import dotenv from 'dotenv';

import './db'; // db 불러오기
import './webSocket/webSocket'; // 웹 소켓 불러오기
import app from './app';
import configs from './configs';

dotenv.config();

const PORT = configs.port;
const SOCKET_PORT = configs.socket_port;
const NODE_ENV = configs.node_env;
const handleListening = () => {
  console.log(`server mode : ${NODE_ENV}`);
  console.log(`API Server : http://localhost:${PORT}`);
  console.log(`Socket Server : http://localhost:${SOCKET_PORT}`);
};
app.listen(PORT, handleListening);
