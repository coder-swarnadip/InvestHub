const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
        },

        amount: {
            type: Number,
            required: [true, "Investment amount is required"],
            min: [1, "Investment amount must be greater than 0"],
        },

        plan: {
            type: String,
            required: [true, "Plan is required"],
            trim: true,
        },

        startDate: {
            type: Date,
            default: Date.now,
            required: [true, "Start date is required"],
        },

        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },

        dailyROIPercentage: {
            type: Number,
            required: [true, "Daily ROI percentage is required"],
            min: 0,
        },

        status: {
            type: String,
            enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Investment", investmentSchema);
