const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const userExists = await User.findOne({ username });

            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = await User.create({
                username,
                password,
            });

            res.status(201).json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

exports.authUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (user && (await user.matchPassword(password))) {
                res.json({
                    _id: user._id,
                    username: user.username,
                    token: generateToken(user._id),
                });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserProfile = [
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updates = req.body;
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            Object.keys(updates).forEach((key) => {
                user[key] = updates[key];
            });

            await user.save();

            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({ _id: req.user.id });

        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
