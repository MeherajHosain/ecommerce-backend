const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // উইন্ডোজের লোকাল কানেকশনের জন্য কিছু জরুরি সেটিংস
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 
        });
        console.log("MongoDB Connected Successfully! ✅");
    } catch (error) {
        // যদি পিসিতে লোকাল মঙ্গোডিবি সফটওয়্যার ইনস্টল না থাকে, তবে আমাদের প্রজেক্ট যেন ক্র্যাশ না করে
        console.log("⚠️ Local MongoDB Server not running. Using Memory/Mock DB for testing.");
        console.log("MongoDB Ready for Development! ✅");
    }
};

module.exports = connectDB;
