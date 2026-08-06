const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");
const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const {
    registerValidator,
    loginValidator,
} = require("../validators/authValidator");

// Public Routes
router.post(
    "/register",
    registerValidator,
    validate,
    asyncHandler(authController.register)
);





router.post(
    "/login",
    loginValidator,
    validate,
    asyncHandler(authController.login)
);

// Private Routes
router.get(
    "/profile",
    asyncHandler(protect),
    asyncHandler(authController.getProfile)
);

router.post(
    "/logout",
    asyncHandler(protect),
    asyncHandler(authController.logout)
);

module.exports = router;