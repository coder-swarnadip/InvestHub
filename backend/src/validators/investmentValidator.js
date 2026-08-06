const { body } = require("express-validator");

const createInvestmentValidator = [
    body("amount")
        .notEmpty()
        .withMessage("Investment amount is required.")
        .isFloat({ gt: 0 })
        .withMessage("Investment amount must be greater than 0."),

    body("plan")
        .trim()
        .notEmpty()
        .withMessage("Plan is required.")
        .isIn([
           "Launch", "Boost", "Orbit", "Nova", "Galaxy"
        ])
        .withMessage("Invalid investment plan."),

      body("duration")
        .notEmpty()
        .withMessage("Duration is required.")
        .isInt({ min: 1 })
        .withMessage("Duration must be a positive integer."),

    body("dailyROIPercentage")
        .notEmpty()
        .withMessage("Daily ROI percentage is required.")
        .isFloat({ gt: 0 })
        .withMessage("Daily ROI percentage must be greater than 0."),
];

module.exports = {
    createInvestmentValidator,
};