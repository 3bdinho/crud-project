const express = require("express");
const bookRoute = require("./routers/bookRoute");
const userRoute = require("./routers/userRoute");
const authRouter = require("./routers/authRouter");
const globalErrorHandler = require("./utils/globalError");
const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRoute);
// app.use("/api/v1/users", authRouter);

app.use(globalErrorHandler);

module.exports = app;
