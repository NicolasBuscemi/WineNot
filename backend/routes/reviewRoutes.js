// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Corrected import
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController'); // Corrected import

router.route('/')
  .get(getReviews)
  .post(protect, addReview);

router.route('/:id')
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
