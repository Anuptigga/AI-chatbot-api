import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, required: true }, // "user" or "assistant"
  content: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required:true},
    chat: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
