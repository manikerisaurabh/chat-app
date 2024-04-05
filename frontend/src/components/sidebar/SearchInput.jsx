import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaSearch } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation'
const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(search)
        if (!search) {
            return;
        }
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 character long");

        }

        const conversation = conversations.find((c) => {
            return c.fullName.toLowerCase().includes(search.toLowerCase());
        });

        console.log(conversation);
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else {
            return toast.error("No such user find");
        }
    }
    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input type="text"
                placeholder='Search..'
                className='input input-bordered rounded-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>

        </form>
    )
}

export default SearchInput