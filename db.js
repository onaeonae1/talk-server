import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongo_url = process.env.MONGO_PROD_URL;
console.log(mongo_url);
mongoose.connect(
    mongo_url,
    {
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    }
);
const db = mongoose.connection;
const handleOpen = () => console.log(`DB Connected : ${db.models}`);
const handleError = (error) => console.log(`error on db connection ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);