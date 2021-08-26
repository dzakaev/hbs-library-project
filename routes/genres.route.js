const { Router } = require("express");
const { genresController } = require("../controllers/genres.controller");

const router = Router();

router.post("/", genresController.createGenre);
router.get("/", genresController.getGenre);
router.patch("/admin/:id", genresController.editGenre);
router.delete("/admin/:id", genresController.removeGenre);

module.exports = router;