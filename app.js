import "./config/envConfig.js"
import express from "express";
import dbConnect from "./config/dbConfig.js"
import cors from "cors"
import authRoute from "./routes/authRoutes.js"

const app=express();
app.use(cors());
app.use(express.json())

dbConnect();

app.use('/api/auth',authRoute)
export default app;