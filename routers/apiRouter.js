import express from "express";
import { apiTest } from "../controllers/apiController";
const apiRouter = express.Router();
apiRouter.get("/", apiTest);
export default apiRouter;