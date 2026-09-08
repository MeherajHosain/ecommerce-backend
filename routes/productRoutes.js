const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const router = express.Router();

// সব প্রোডাক্ট পাওয়ার রাউট
router.get('/', getProducts);

// নতুন প্রোডাক্ট তৈরি করার রাউট
router.post('/add', createProduct);

module.exports = router;
