const { Router } = require("express");
const { reviewsController } = require("../controllers/reviews.controller");

const router = Router();

router.post("/:id", reviewsController.createReview);
router.get("/:id", reviewsController.getReviewsByBookId);

module.exports = router;