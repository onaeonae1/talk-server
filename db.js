import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongo_url = process.env.MONGO_PROD_URL;
console.log(`Try to Connect : ${mongo_url}`);
mongoose.connect(
    mongo_url,
    {
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    }
);
const db = mongoose.connection;

db.once("open", ()=>{
    console.log('DB Connected : API Server');
});
db.on("error", ()=>{
    console.log(`error on db connection ${error}`);
});