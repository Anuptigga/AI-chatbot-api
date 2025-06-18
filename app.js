import "./config/envConfig.js"
import express from "express";
import dbConnect from "./config/dbConfig.js"
import cors from "cors"
import authRoute from "./routes/authRoutes.js"
import aiRoute from "./routes/aiRoutes.js"
import chatRoute from"./routes/chatRoutes.js"

const app=express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json())

dbConnect();

app.use('/api/auth',authRoute)
app.use('/api/openrouter',aiRoute)
app.use("/api/chat",chatRoute)
export default app;