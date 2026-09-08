const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// আসল ডেটাবেজের বদলে লোকাল মেমোরি অ্যারে (টেস্টিংয়ের জন্য)
const users = [];

// ইউজার রেজিস্ট্রেশনের লজিক
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ১. চেক করা ইউজার আগে থেকেই মেমোরিতে আছে কিনা
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({ message: "এই ইমেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে!" });
        }

        // ২. পাসওয়ার্ড এনক্রিপ্ট/হ্যাশ করা
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ৩. নতুন ইউজার অবজেক্ট তৈরি করে মেমোরিতে পুশ করা
        const newUser = {
            _id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            password: hashedPassword,
            role: 'user'
        };
        users.push(newUser);

        // ৪. লগইন সেশন ধরে রাখার জন্য JWT টোকেন তৈরি
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            message: "রেজিস্ট্রেশন সফল হয়েছে! 🎉",
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        res.status(500).json({ message: "সার্ভারে কোনো সমস্যা হয়েছে", error: error.message });
    }
};
// ইউজার লগইনের লজিক (এটি registerUser-এর নিচে পেস্ট করুন)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ১. চেক করা ইমেইল দিয়ে কোনো ইউজার মেমোরিতে আছে কিনা
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ message: "ভুল ইমেইল অথবা পাসওয়ার্ড!" });
        }

        // ২. পাসওয়ার্ড চেক করা (কাস্টমারের দেওয়া পাসওয়ার্ড আর হ্যাশ করা পাসওয়ার্ড মিলছে কিনা)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "ভুল ইমেইল অথবা পাসওয়ার্ড!" });
        }

        // ৩. লগইন সফল হলে নতুন JWT টোকেন তৈরি করা
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({
            message: "লগইন সফল হয়েছে! 🔓",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: "সার্ভারে কোনো সমস্যা হয়েছে", error: error.message });
    }
};

// একদম শেষে module.exports-এর ভেতরে loginUser যুক্ত করে দিন
module.exports = { registerUser, loginUser };

