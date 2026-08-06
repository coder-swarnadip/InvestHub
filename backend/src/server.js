
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const startROICron = require("./cron/roiCron");
const app = require("./app");
const connectDB = require("./config/db");
// Connect to MongoDB

connectDB();

startROICron();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});