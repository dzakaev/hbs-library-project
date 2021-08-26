const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rentBook: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Book",
    },
  ],
  isBlocked: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
