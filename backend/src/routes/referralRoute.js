const express = require("express");
const router = express.Router();

const referralController = require("../controllers/referralController");
const protect = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

router.get(
    "/direct",
   asyncHandler(protect),
    asyncHandler(referralController.getDirectReferrals)
);

router.get(
    "/tree",
    asyncHandler(protect),
    asyncHandler(referralController.getReferralTree)
);

module.exports = router;