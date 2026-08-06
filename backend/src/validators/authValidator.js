const { body } = require("express-validator");

// ==========================
// Register Validator
// ==========================
const registerValidator = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required.")
        .isLength({ min: 3, max: 50 })
        .withMessage("Full name must be between 3 and 50 characters."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("mobile")
        .trim()
        .notEmpty()
        .withMessage("Mobile number is required.")
        .isMobilePhone("en-IN")
        .withMessage("Please enter a valid mobile number."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),

    body("referredBy")
        .optional()
        .trim(),
];

// ==========================
// Login Validator
// ==========================
const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required."),
];

module.exports = {
    registerValidator,
    loginValidator,
};