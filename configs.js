import dotenv from 'dotenv';

dotenv.config();

const configs = {
  database: process.env.MONGO_PROD_URL,
  port: process.env.PORT,
  socket_port: process.env.SOCKET_PORT,
  node_env: process.env.NODE_ENV,
};

export default configs;
