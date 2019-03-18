const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: String,
  author: { type: Array, required: true },
  description: String,
  image: String,
  link: String,
  date: { type: Date, default: Date.now },
  isSaved: { type: Boolean, default: false }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
