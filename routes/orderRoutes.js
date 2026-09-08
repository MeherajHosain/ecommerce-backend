const express = require('express');
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

// অর্ডার প্লেস করার রাউট (POST)
router.post('/place', placeOrder);

// নির্দিষ্ট ইউজারের সব অর্ডার দেখার রাউট (GET)
router.get('/:userId', getUserOrders);

module.exports = router;
