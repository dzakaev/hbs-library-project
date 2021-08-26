const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String
  },
  genre: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Genre"
  },
  rented: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
})

const Book = mongoose.model("Book", booksSchema);

module.exports = Book;