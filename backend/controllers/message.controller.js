import mongoose from 'mongoose';

import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketid } from '../socket/socket.js';
import { io } from '../socket/socket.js'
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
        await Promise.all([newMessage.save(), conversatoin.save()]); //optimized way to save multiple collection at a time

        //socket.io functionality
        const receiverSocketId = getReceiverSocketid(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        // await newMessage.save();
        // await conversatoin.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in  getMessage controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}