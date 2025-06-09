import "./config/envConfig.js"
import express from "express";
import dbConnect from "./config/dbConfig.js"
import cors from "cors"
import authRoute from "./routes/authRoutes.js"
import aiRoute from "./routes/aiRoutes.js"

const app=express();
app.use(cors());
app.use(express.json())

dbConnect();

app.use('/api/auth',authRoute)
app.use('/api/openrouter',aiRoute)
export default app;