const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  encodeURIComponent(process.env.DATABASE_PASSWORD)
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DB connection successful"))
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  });

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`you are runnig on port ${port}`);
});
