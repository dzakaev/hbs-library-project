const Review = require("../models/Review.model");

module.exports.reviewsController = {
  createReview: async (req, res) => {
    const { text, book, user } = req.body;
    try {
      await Review.create({
        text,
        book,
        user,
      });
      res.json("Комментарий успешно добавлен");
    } catch (e) {
      res.json(e.message);
    }
  },
  getReviewsByBookId: async (req, res) => {
    try {
      const reviews = await Review.find({ book: req.params.id });
      res.json(reviews);
    } catch (e) {
      res.json(e.message);
    }
  },
};
