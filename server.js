const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Environment Variables লোড করা
dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // ফ্রন্টএন্ড থেকে আসা JSON ডেটা রিড করার জন্য
app.use(cors()); // অন্য পোর্ট বা ডোমেইন থেকে রিকোয়েস্ট অ্যাক্সেস দেওয়ার জন্য
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
// Product Route (নতুন যোগ করুন)
app.use('/api/products', require('./routes/productRoutes'));
// Cart Route (নতুন যোগ করুন)
app.use('/api/cart', require('./routes/cartRoutes'));
// Order Route (নতুন যোগ করুন)
app.use('/api/orders', require('./routes/orderRoutes'));


// ডেটাবেজ কানেক্ট করা
connectDB();

// প্রথম টেস্ট রাউট (Route)
app.get('/', (req, res) => {
    res.send("E-commerce API is running successfully! 🚀");
});

// সার্ভার পোর্ট সেটআপ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🔥`);
});
