const mongoose = require("mongoose");

const referralIncomeSchema = new mongoose.Schema(
    {
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Receiver is required"],
        },

        sourceUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Source user is required"],
        },

        level: {
            type: Number,
            required: [true, "Referral level is required"],
            min: 1,
        },

        amount: {
            type: Number,
            required: [true, "Income amount is required"],
            min: 100,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ReferralIncome", referralIncomeSchema);
