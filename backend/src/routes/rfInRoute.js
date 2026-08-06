
const express = require("express");
const router = express.Router();

const rfInController = require("../controllers/rfInController");
const protect = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");



router.get(
    "/",
    asyncHandler(protect),
    asyncHandler(rfInController.getReferralIncomeHistory)
);

module.exports = router;