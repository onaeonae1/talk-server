import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config(path.join(__dirname, '../'));
const mongoUrl = process.env.MONGO_PROD_URL;
console.log(`(Socket DB)Try to Connect : ${mongoUrl}`);
mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('DB Connected : Socket');
});
db.on('error', (error) => {
  console.log(`error on db connection ${error}`);
});
