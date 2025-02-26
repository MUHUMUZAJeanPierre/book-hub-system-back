const express = require("express");
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const bookRouter = express.Router();
const { upload } = require("../config/multerConfig");

// Define routes
bookRouter.post("/", upload.single("image"), createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.put("/:id", upload.single("image"), updateBook); // Include upload middleware for updates
bookRouter.delete("/:id", deleteBook);

module.exports = bookRouter;
