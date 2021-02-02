import dotenv from 'dotenv';

dotenv.config();

const configs = {
  database: process.env.MONGO_PROD_URL,
  port: process.env.PORT,
  socket_port: process.env.SOCKET_PORT,
  node_env: process.env.NODE_ENV,
  secret_key: process.env.SECRET_KEY,
  jwt_secret: process.env.JWT_SECRET,
  aws_access: process.env.AWS_ACCESS_KEY_ID,
  aws_secret: process.env.AWS_SECRET_ACCESS_KEY,
};

export default configs;
