const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");


const router = Router();

router.post("/", booksController.createBook);
router.get("/users/:userId/books", booksController.getBooks);
router.get("/users/:userId/books/:bookId", booksController.getBookById);
router.get("/users/:userId/genres/:id", booksController.getBooksByGenres);
router.patch("/admin/:id", booksController.editBooks);
router.delete("/admin/:id", booksController.removeBooks);
router.get("/admin/:userId/takeBook/:bookId/", booksController.takeBook);
router.get("/admin/block/:userId", booksController.blockProfile);
router.get("/admin/unblock/:userId", booksController.unblockProfile);

module.exports = router