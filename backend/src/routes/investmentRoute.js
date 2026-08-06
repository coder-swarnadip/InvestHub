const express = require("express");
const router = express.Router();

const investmentController = require("../controllers/investmentController");
const asyncHandler = require("../utils/asyncHandler");
const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const { createInvestmentValidator } = require("../validators/investmentValidator");


// Private Routes

router.post(
    "/",
    asyncHandler(protect),
    createInvestmentValidator,
    validate,
    asyncHandler(investmentController.createInvestment)
);

router.get(
    "/",
    asyncHandler(protect),
    asyncHandler(investmentController.getUserInvestments)
);

module.exports= router;