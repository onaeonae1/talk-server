import mongoose from 'mongoose';
import configs from './configs';

const mongoUrl = configs.database;
console.log(`(Main DB) Try to Connect : ${mongoUrl}`);
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
