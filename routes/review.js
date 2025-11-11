const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncWrap");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

const reviewController = require("../controllers/reviews");

// reviews
router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrap(reviewController.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  asyncWrap(reviewController.deleteReview)
);

module.exports = router;
