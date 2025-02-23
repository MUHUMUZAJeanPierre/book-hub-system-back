const Book = require("../model/bookModel");

exports.getAllBooks = async (req, res) => {
    try {
        const { title, author, genre, publicationDate, description, chapters } = req.body;

        if(!title || !author || !genre || !publicationDate || !description || !chapters) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new Book({ 
            title, 
            author, 
            genre, 
            publicationDate, 
            description, 
            chapters });
        await newBook.save();
        res.status(201).json({ book: newBook, message: "Book added successfully" });
        
    } catch (error) {
        console.log(error);        
        res.status(400).json({ message: "Error creating book", error: error.message  });
    }
}

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, publicationDate, description, chapters } = req.body;

        if(!title || !author || !genre || !publicationDate || !description || !chapters) {
            res.status(400).json({ message: "All fields are required" });
        }
        const updateBook = await Book.findByIdAndUpdate(id, { title, author, genre, publicationDate, description, chapters }, { new: true });
        res.status(200).json({ data : updateBook, message: "Book updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
        console.log(error);
        
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const Book = await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Book deleted successfully", data: Book });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
        console.log(error);
        
    }
}

// exports.addChapter = async (req, res) => {
//     try {
//         const { id } = req.params; 
//         const { title, pages } = req.body; 
//         const chapter = {
//             title,
//             pages,
//         };

//         const updatedBook = await Book.findByIdAndUpdate(id, {
//             $push: { chapters: chapter },
//         }, { new: true });

//         if (!updatedBook) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         res.status(201).json(updatedBook);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error adding chapter", error: error.message });
//     }
// };

// exports.removeChapter = async (req, res) => {
//     try {
//         const { bookId, chapterId } = req.params; 

//         const updatedBook = await Book.findByIdAndUpdate(bookId, {
//             $pull: { chapters: { _id: chapterId } },
//         }, { new: true });

//         if (!updatedBook) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         res.status(200).json(updatedBook);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error removing chapter", error: error.message });
//     }
// };