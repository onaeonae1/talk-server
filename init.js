import dotenv from 'dotenv';
import './db'; // db 불러오기
import './webSocket/webSocket'; // 웹 소켓 불러오기
import app from './app';

dotenv.config();

const { PORT } = process.env;
const { SOCKET_PORT } = process.env;
const handleListening = () => {
  console.log(`API Server : http://localhost:${PORT}`);
  console.log(`Socket Server : http://localhost:${SOCKET_PORT}`);
};
app.listen(PORT, handleListening);
