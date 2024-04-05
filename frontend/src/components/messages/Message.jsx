import React from 'react'
import useGetMessages from '../../hooks/useGetMessages'

const Message = () => {
    const { messages, loading } = useGetMessages();
    console.log("MESSAGES : ")
    messages.map((mes) => {
        console.log(mes?.message)
    })
    return (
        <div className='chat chat-end'>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src="https://avatar.iran.liara.run/public/boy?username=butki" alt="user avatar" />
                </div>
            </div>
            <div className='chat-bubble text-white bg-blue-500'>
                Heyy.. Whats up??
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
        </div>
    )
}

export default Message