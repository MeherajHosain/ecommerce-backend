// কাস্টমারদের কার্টের ডেটা সাময়িকভাবে জমা রাখার জন্য ইন-মেমোরি অবজেক্ট
// এখানে ইউজারের ID অনুযায়ী তার প্রোডাক্টের লিস্ট সেভ থাকবে
const carts = {};

// ১. কার্টে প্রোডাক্ট যোগ করার লজিক
const addToCart = async (req, res) => {
    try {
        const { userId, productId, title, price, quantity } = req.body;

        // যদি এই ইউজারের আগে থেকে কোনো কার্ট না থাকে, তবে একটি খালি কার্ট তৈরি করা
        if (!carts[userId]) {
            carts[userId] = [];
        }

        // চেক করা এই প্রোডাক্টটি অলরেডি কাস্টমারের কার্টে আছে কিনা
        const existingItem = carts[userId].find(item => item.productId === productId);

        if (existingItem) {
            // যদি প্রোডাক্টটি অলরেডি থাকে, তবে শুধু তার পরিমাণ (Quantity) বাড়িয়ে দেওয়া
            existingItem.quantity += Number(quantity || 1);
        } else {
            // যদি প্রোডাক্টটি একদম নতুন হয়, তবে কার্টের লিস্টে পুশ করা
            carts[userId].push({
                productId,
                title,
                price: Number(price),
                quantity: Number(quantity || 1)
            });
        }

        res.status(200).json({
            message: "প্রোডাক্টটি কার্টে যোগ করা হয়েছে! 🛒",
            cart: carts[userId]
        });
    } catch (error) {
        res.status(500).json({ message: "কার্টে যোগ করতে সমস্যা হয়েছে", error: error.message });
    }
};

// ২. কার্টের ভেতরের সব প্রোডাক্ট দেখার লজیک
const getCart = async (req, res) => {
    try {
        const { userId } = req.params; // ইউআরএল (URL) থেকে ইউজারের আইডি নেওয়া

        const userCart = carts[userId] || [];
        
        // কার্টের টোটাল প্রাইজ হিসাব করা
        const totalPrice = userCart.reduce((total, item) => total + (item.price * item.quantity), 0);

        res.json({
            userId,
            totalItems: userCart.length,
            totalPrice,
            cart: userCart
        });
    } catch (error) {
        res.status(500).json({ message: "কার্ট লোড করতে সমস্যা হয়েছে", error: error.message });
    }
};

// ৩. কার্ট থেকে প্রোডাক্ট ডিলিট করার লজিক
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (carts[userId]) {
            // ফিল্টার করে ওই নির্দিষ্ট প্রোডাক্ট আইডিটি বাদ দিয়ে বাকিগুলো রাখা
            carts[userId] = carts[userId].filter(item => item.productId !== productId);
        }

        res.json({
            message: "প্রোডাক্টটি কার্ট থেকে মুছে ফেলা হয়েছে! 🗑️",
            cart: carts[userId] || []
        });
    } catch (error) {
        res.status(500).json({ message: "কার্ট থেকে ডিলিট করতে সমস্যা হয়েছে", error: error.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart };
