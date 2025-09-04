const User = require("./../models/usersModel");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const createSendToken = require("./../utils/createSendToken");

exports.signup = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (await User.findOne({ email }))
    return next(new AppError("this user already exist!", 400));

  const user = await User.create(req.body);

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1)Check if email and password exist
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));
  //2)Check if user exist and password coorect
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password)))
    return next(new AppError("No user with this email or password", 400));

  //3)If everything okay, send token and res
  createSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError("The user belonging to this token no longer exist.", 401)
    );
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  req.user = user;
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
