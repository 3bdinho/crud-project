const { stringify } = require("querystring");
const AppError = require("../utils/appError");
const Book = require("./../models/booksModel");
const catchAsync = require("./../utils/catchAsync");
const APIFeature = require("../utils/APIFeature");

exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: "success",
    data: newBook,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const features = new APIFeature(Book.find().req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const books = await features.query;
  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
});
