const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.post("/", usersController.createUsers);
router.get("/users/", usersController.getUser);
router.get("/admin/users/", usersController.getUserByAdmin);
router.get("/admin/users/:id", usersController.getUserProfile);
router.get("/users/:userId", usersController.getProfile);
router.get("/users/:userId/rentBook/:bookId", usersController.rentBook);
router.get("/users/:userId/returnBook/:bookId", usersController.returnBook);

module.exports = router;