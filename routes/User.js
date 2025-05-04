const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const{registerUser,loginUser,fetchUserProfile,updateUserProfile}=require('../controllers/authController');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware,fetchUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
