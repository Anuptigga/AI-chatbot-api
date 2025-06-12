import express from "express";
import {
  deleteChat,
  getAllChats,
  getSingleChat,
  updateChatTitle,
} from "../controllers/chatControllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllChats", authenticated, getAllChats);
router.get("/:chatId", authenticated, getSingleChat);
router.put("/:chatId", authenticated, updateChatTitle);
router.delete("/:chatId", authenticated, deleteChat);

export default router;
