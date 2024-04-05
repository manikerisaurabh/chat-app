import React, { useEffect, useRef, useState } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import Message from './Message'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages'
const Messages = () => {
    const { loading, messages } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
        }, 100);
    }, [messages])

    //console.log("Messages : " + messages)
    return (
        <div className='p-4 flex-1 overflow-auto'>

            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id}
                        ref={lastMessageRef}
                    >
                        <Message message={message} />
                    </div>
                ))}
            {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start conversation</p>
            )}
        </div>
    )
}

export default Messages