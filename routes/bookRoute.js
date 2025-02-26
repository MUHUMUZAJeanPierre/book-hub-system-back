const express = require("express");
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const bookRouter = express.Router();

// Define routes
bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

module.exports = bookRouter;
