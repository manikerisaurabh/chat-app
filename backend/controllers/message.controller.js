import mongoose from 'mongoose';

import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
export const sendMessage = async (req, res) => {
    try {
        let { id: receiverId } = req.params;
        let { recieverId, message } = req.body;
        let senderId = req.user._id;

        let conversatoin = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });


        if (!conversatoin) {
            conversatoin = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {

            conversatoin.messages.push(newMessage._id);
        };

        // await newMessage.save();
        // await conversatoin.save();

        await Promise.all([newMessage.save(), conversatoin.save()]); //optimized way to save multiple collection at a time
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in message/send controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}