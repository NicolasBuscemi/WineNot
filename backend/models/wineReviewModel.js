const mongoose = require('mongoose');

const wineReviewSchema = new mongoose.Schema({
    wineId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, { timestamps: true });

const WineReview = mongoose.model('WineReview', wineReviewSchema); 

module.exports = WineReview;
