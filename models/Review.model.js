const mongoose = require("mongoose");


const reviewsSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  book: {
    type: String,
    ref: "Book",
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  }
})

const Review = mongoose.model("Review", reviewsSchema)

module.exports = Review