const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new new({ 
            name, 
            email, 
            password: hashedPassword });
        await newUser.save();
        res.status(201).json({ user: newUser, message: "User registered successfully" });
    } catch (error) {
        
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id },  process.env.JWT_SECRET);
        res.status(200).json({ user, token });
        
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports = {
    register,
    login
};