const WineReview = require('../models/wineReviewModel');

const addWineReview = async (req, res) => {
    const { wineId, review, rating } = req.body;
    const userId = req.user.id;

    try {
        const newReview = new WineReview({ wineId, userId, review, rating });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getWineReviews = async (req, res) => {
    try {
        const reviews = await WineReview.find({ wineId: req.params.wineId }).populate('userId', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addWineReview, getWineReviews };
