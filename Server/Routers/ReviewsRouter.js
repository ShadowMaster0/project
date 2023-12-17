const reviewsBLL = require("../BLL/ReviewsBLL");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const reviews = await reviewsBLL.getAllReviews();
  return res.json({ reviews });
});

router.get("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const review = await reviewsBLL.GetReviewById(reviewId);
  return res.json({ review });
});

router.post("/", async (req, res) => {
  const data = req.body;
  const message = await reviewsBLL.addNewReview(data);
  return res.status(201).json({ message });
});

router.put("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const data = req.body;
  const message = await reviewsBLL.updateReview(reviewId, data);
  return res.status(200).json({ message });
});

router.delete("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const message = await reviewsBLL.deleteReview(reviewId);
  return res.status(200).json({ message });
});

module.exports = router;
