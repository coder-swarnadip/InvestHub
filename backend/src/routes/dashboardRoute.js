const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const protect = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

router.get(
    "/",
    asyncHandler(protect),
    asyncHandler(dashboardController.getDashboard)
);

module.exports = router;