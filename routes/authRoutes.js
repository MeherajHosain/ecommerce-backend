const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // এখানে loginUser যোগ হয়েছে
const router = express.Router();

// রেজিস্ট্রেশন রাউট
router.post('/register', registerUser);

// লগইন রাউট (নতুন যোগ করুন)
router.post('/login', loginUser);

module.exports = router;
