const mongoose = require("mongoose");


const genresSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true
  }
});

const Genre = mongoose.model("Genre", genresSchema);

module.exports = Genre
