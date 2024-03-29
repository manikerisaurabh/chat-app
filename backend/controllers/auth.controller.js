import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password do not matches" });
        }

        const user = User.find({ username: username });
        console.log(user);
        if ((await user).length > 0) {
            return res.status(400).json({ error: "username already exists" });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const gitlProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({
            fullName: fullName,
            username: username,
            password: hashedPassword,
            gender: gender,
            profilepic: gender == "male" ? boyProfilepic : gitlProfilepic
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilepic: newUser.profilepic
            });
        } else {
            res.status(400).json({ error: "Invalid user Data" });
        }



    } catch (error) {
        console.log("Error in signup controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        let isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "invalid username or password" })
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilepic: user.profilepic
        });



    } catch (error) {
        console.log("Error in login controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in login controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};