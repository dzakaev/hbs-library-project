const { Router } = require("express");

const router = Router();

router.use("/", require("./books.route"));
router.use("/genres", require("./genres.route"));
router.use("/reviews", require("./reviews.route"));
router.use("/", require("./users.route"));

module.exports = router;
