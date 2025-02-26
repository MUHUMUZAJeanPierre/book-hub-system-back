const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({ status: "error", message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });

        // Save user
        await newUser.save();

        // Create JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: {
                user: { id: newUser._id, name: newUser.name, email: newUser.email },
                token
            }
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: "error", message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "error", message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                token
            }
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error: error.message });
    }
};

module.exports = { register, login };
