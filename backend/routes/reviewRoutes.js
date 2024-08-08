
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController'); 

router.route('/')
  .get(getReviews)
  .post(protect, addReview);

router.route('/:id')
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
