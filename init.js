import dotenv from "dotenv";
import "./db";
import app from "./app";
import path from "path";
dotenv.config();

const PORT = process.env.PORT;
const handleListening = () =>{
    console.log(`Server Listening on https://localhost:${PORT}`);
}
app.listen(PORT, handleListening); 
