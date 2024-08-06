const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// User Sign-Up
router.post('/signup', registerUser);

// User Login
router.post('/login', authUser);

// Get User Profile
router.get('/profile', protect, getUserProfile);

// Update User Profile
router.put('/profile', protect, updateUserProfile);

// Delete User Profile
router.delete('/profile', protect, deleteUserProfile);

module.exports = router;
