const express = require('express');
const router = express.Router();
const { addWineReview, getWineReviews } = require('../controllers/wineReviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addWineReview);

router.route('/:wineId')
    .get(getWineReviews);

module.exports = router;
