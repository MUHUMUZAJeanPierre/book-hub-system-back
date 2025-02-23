const mongoose = require("mongoose");

const bookChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    pages: [{
            type: Number,
            required: true
        }
    ]});


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    chapters: [bookChapterSchema]
});

module.exports = mongoose.model("Book", bookSchema);