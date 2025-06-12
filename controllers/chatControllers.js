import Chat from "../models/Chat.js";

// GET ALL CHATS
export const getAllChats = async (req, res) => {
  try {
    const userId = req.currentUser._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch chats", error: error.message });
  }
};

// GET ONE CHAT
export const getSingleChat = async (req, res) => {
  try {
    const userId = req.currentUser._id;
    const { chatId } = req.params;
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch chat", error: error.message });
  }
};

// UPDATE CHAT TITLE
export const updateChatTitle = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { title } = req.body;
    const userId = req.currentUser._id;
    const chat = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { title },
      { new: true }
    );
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update title", error: error.message });
  }
};

// DELETE CHAT
export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.currentUser._id;
    const chat = await Chat.findOneAndDelete({ _id: chatId, userId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete chat", error: error.message });
  }
};
