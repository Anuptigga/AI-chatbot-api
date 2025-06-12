import axios from "axios";
import Chat from "../models/Chat.js";

export const queryLLM = async (req, res) => {
  try {
    const { prompt, chatId} = req.body;
    const userId = req.currentUser._id;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Query the LLM
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 100,
        temperature: 0.4,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_ROUTER_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    // Save chat history
    let chat;
    if (chatId) {
      // Existing chat: append messages
      chat = await Chat.findOne({ _id: chatId, userId });
      if (!chat) return res.status(404).json({ message: "Chat not found" });
      chat.chat.push(
        { role: "user", content: prompt },
        { role: "assistant", content: reply }
      );
      await chat.save();
    } else {
      // New chat: create
      const chatTitle = prompt.split(" ").slice(0, 5).join(" ") || "New Chat";
      chat = await Chat.create({
        userId,
        title: chatTitle,
        chat: [
          { role: "user", content: prompt },
          { role: "assistant", content: reply },
        ],
      });
    }

    res.status(200).json({ reply, chatId: chat._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error querying LLM", error: error.message });
  }
};
