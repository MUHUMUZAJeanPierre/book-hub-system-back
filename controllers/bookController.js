const Book = require("../model/bookModel");
const { cloudinary } = require("../config/cloudinaryConfig");

// Create a new book
exports.createBook = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "Image file is required"
            });
        }

        // Upload image to Cloudinary using buffer
        const cloudinaryResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "book_images", resource_type: "image" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        // Create new book entry
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationDate: req.body.publicationDate,
            description: req.body.description,
            image: cloudinaryResult.secure_url, // Save Cloudinary image URL
        });

        await newBook.save();

        res.status(201).json({
            status: "success",
            message: "Book created successfully",
            data: newBook
        });

    } catch (error) {
        res.status(500).json({
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
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                status: "error",
                message: "Book not found"
            });
        }

        let imageUrl = book.image;
        if (req.file) {
            // Upload new image to Cloudinary
            const cloudinaryResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "book_images", resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            imageUrl = cloudinaryResult.secure_url;
        }

        // Update book details
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publicationDate = req.body.publicationDate || book.publicationDate;
        book.description = req.body.description || book.description;
        book.image = imageUrl;

        await book.save();

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
