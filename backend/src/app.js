const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();



const authRoute = require("./routes/authRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const investmentRoute = require("./routes/investmentRoute");
const referralRoute = require("./routes/referralRoute");
const roiHistoryRoute= require("./routes/roiHistoryroute");
const rfInRoute = require("./routes/rfInRoute");



// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Investment Platform API is running...",
    });
});

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/investments", investmentRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/referrals", referralRoute);
app.use("/api/roi-history", roiHistoryRoute);
app.use("/api/referral-income", rfInRoute);



// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;