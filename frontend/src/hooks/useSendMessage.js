import React, { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        try {
            if (!selectedConversation) {
                throw new Error("No conversation selected");
            }

            setLoading(true);
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }

            const data = await res.json();
            setMessages([...messages, data]);
            toast.success('Message sent successfully');
        } catch (error) {
            toast.error(error.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
