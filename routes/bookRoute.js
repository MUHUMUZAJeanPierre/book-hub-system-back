const {getAllBooks, getBookById, updateBook, deleteBook} = require("../controllers/bookController");
const express = require("express");
const BookRouter = express.Router();


BookRouter.get("/", getAllBooks);
BookRouter.get("/:id", getBookById);
BookRouter.put("/:id", updateBook);
BookRouter.delete("/:id", deleteBook);

module.exports = BookRouter;