const Book = require("../model/bookModel");

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({
            status: "success",
            message: "Book created successfully",
            data: book
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Failed to create book",
            error: error.message
        });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            status: "success",
            message: "Books retrieved successfully",
            data: books
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch books",
            error: error.message
        });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Book not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Book retrieved successfully",
            data: book
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve book",
            error: error.message
        });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Book not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Book updated successfully",
            data: book
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to update book",
            error: error.message
        });
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Book not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Book deleted successfully",
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete book",
            error: error.message
        });
    }
};
