const express = require("express");
const router = express.Router();

const roiController = require("../controllers/roiHistoryController");
const verifyJWT = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

router.get(
    "/",
    asyncHandler(verifyJWT),
    asyncHandler(roiController.getROIHistory)
);

module.exports = router;