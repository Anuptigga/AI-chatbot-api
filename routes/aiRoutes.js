import express from "express";
import { queryLLM } from "../controllers/aiControllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/query", authenticated, queryLLM);

export default router;