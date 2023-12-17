const ReviewsModel = require("../Models/ReviewsModel");

const getAllReviews = async () => {
  try {
    const allReviews = await ReviewsModel.find({});
    return allReviews;
  } catch (e) {
    console.log(e);
  }
};

const GetReviewById = async (reviewId) => {
  try {
    const review = await ReviewsModel.findById(reviewId);
    return review;
  } catch (e) {
    console.log(e);
  }
};

const addNewReview = async (review) => {
  const newReview = new ReviewsModel(review);
  await newReview.save();
  return "Created!";
};

const updateReview = async (reviewId, reviewData) => {
  await ReviewsModel.findByIdAndUpdate(reviewId, reviewData);
  return "Updated!";
};

const deleteReview = async (reviewId) => {
  await ReviewsModel.findByIdAndDelete(reviewId);
  console.log(reviewId);
  return "Deleted!";
};

module.exports = {
  getAllReviews,
  GetReviewById,
  addNewReview,
  updateReview,
  deleteReview,
};
