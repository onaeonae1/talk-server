import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongoUrl = process.env.MONGO_PROD_URL;
console.log(`Try to Connect : ${mongoUrl}`);
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
  console.log('DB Connected : API Server');
});
db.on('error', (error) => {
  console.log(`error on db connection ${error}`);
});
