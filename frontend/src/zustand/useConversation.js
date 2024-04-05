import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }), // Corrected this line
    messages: [],
    setMessages: (messages) => set({ messages })
}));

export default useConversation;
