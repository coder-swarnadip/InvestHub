const mongoose = require("mongoose");

const roiHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            index: true,
        },

        investment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Investment",
            required: [true, "Investment reference is required"],
            index: true,
        },

        roiAmount: {
            type: Number,
            required: [true, "ROI amount is required"],
            min: 0,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: ["PENDING", "PROCESSED"],
            default: "PROCESSED",
        },
    },
    {
        timestamps: true,
    }
    
);

roiHistorySchema.index(
    {
        investment: 1,
        date: 1,
    },
    {
        unique: true,
    }
);

const ROIHistory = mongoose.model("ROIHistory", roiHistorySchema);

module.exports = ROIHistory;