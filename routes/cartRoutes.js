const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

// কার্টে প্রোডাক্ট যোগ করার রাউট (POST)
router.post('/add', addToCart);

// নির্দিষ্ট ইউজারের কার্ট দেখার রাউট (GET) -> এখানে :userId দিয়ে ডাইনামিক আইডি পাঠানো যাবে
router.get('/:userId', getCart);

// কার্ট থেকে প্রোডাক্ট ডিলিট করার রাউট (DELETE এর বদলে POST ব্যবহার করছি সহজে টেস্টের জন্য)
router.post('/remove', removeFromCart);

module.exports = router;
