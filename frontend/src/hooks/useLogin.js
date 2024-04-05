import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useLogin = () => {
    const [loading, setloading] = useState(false);

    const { setAuthUser } = useAuthContext();
    const login = async (username, password) => {
        console.log("this is prop" + username, password)
        const success = handelInputErrors(username, password);
        if (!success) {
            return;
        };
        try {
            setloading(true)
            // const res = await fetch("/api/auth/login", {
            //     method: "POST",
            //     headers: { "Content-Type": "applicatoin/json" },
            //     body: JSON.stringify({ username, password })
            // });
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false);
        }
    }
    return { loading, login }
}

export default useLogin


function handelInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill all the field.");
        return false;
    }

    // if (password !== confirmPassword) {
    //     toast.error("password do not match");
    //     return false;
    // }

    if (password.length < 6) {
        toast.error("password must be of 6 character");
        return false;
    }
    return true;
}