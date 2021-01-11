import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config(path.join(__dirname, '../'));
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
    console.log(`DB Connected : Socket`);
});
db.on("error", (error)=>{
    console.log(`error on db connection ${error}`);
});