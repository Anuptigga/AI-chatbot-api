import User from "../models/User.js";
import Chat from "../models/Chat.js";

export const getAIUsageStats = async(req,res)=>{
    try {
        const totalUsers= await User.countDocuments()
        const totalChats= await Chat.countDocuments()
        const totalPrompts= await Chat.aggregate([
            {$unwind:"$chat"},
            {$match:{"chat.role":"user"}},
            {$count:"count"}
        ])
        const mostActiveUsers = await Chat.aggregate([
            {$group:{_id:"$userId",chatCount:{$sum:1}}},
            {$sort:{cahtCount:-1}},
            {$limit:5}
        ])
        const recentChats = await Chat.find().sort({updatedAt:-1}).limit(5);
        res.json({
            totalUsers,
            totalChats,
            totalPrompts: totalPrompts[0]?.count||0,
            mostActiveUsers,
            recentChats
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching Stats", error: error.message });
    }
}