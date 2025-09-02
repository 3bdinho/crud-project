const express = require("express");
const bookRoute = require("./routers/bookRoute");
const userRoute = require("./routers/userRoute");
const globalErrorHandler = require("./utils/globalError");
const app = express();
app.use(express.json());

//app.use("/api/v1/users", userRoute);
app.use("/api/v1/books", bookRoute);

app.use(globalErrorHandler);

module.exports = app;
