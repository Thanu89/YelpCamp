const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campgrounds');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

module.exports = router;
