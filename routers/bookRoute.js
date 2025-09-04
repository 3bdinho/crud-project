const express = require("express");
const bookController = require("./../controller/bookController");
const authController = require("./../controller/authController");
const router = express.Router();

router
  .route("/")
  .post(bookController.createBook)
  .get(bookController.getAllBooks);

router
  .route("/:id")
  .get(bookController.getBookById)
  .patch(
    authController.protect,
    authController.restrictTo("editor", "admin"),
    bookController.updateBook
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    bookController.deleteBook
  );

module.exports = router;
