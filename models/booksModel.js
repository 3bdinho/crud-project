// (title, author, year, genre …)
const mongoose = require("mongoose");
const { type } = require("os");
const { title } = require("process");
const { boolean } = require("webidl-conversions");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  author: {
    type: String,
    required: true,
    minlength: 5,
  },
  year: Number,
  genre: String,
  active: {
    type: Boolean,
    default: true,
  },
});
booksSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = mongoose.model("Book", booksSchema);
