const mongoose = require("mongoose");

const Investment = require("../models/Investment");
const ROIHistory = require("../models/RoiHistory");
const User = require("../models/User");

const generateDailyROI = async () => {
    // Today's Date (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all active investments
    const investments = await Investment.find({
        status: "ACTIVE",
    });

    for (const investment of investments) {
        // Skip completed investments
        if (investment.endDate < today) {
            investment.status = "COMPLETED";
            await investment.save();
            continue;
        }

        // Check duplicate ROI
        const alreadyGenerated = await ROIHistory.findOne({
            investment: investment._id,
            date: today,
        });

        if (alreadyGenerated) {
            continue;
        }

        // Calculate ROI
        const roiAmount =
            (investment.amount * investment.dailyROIPercentage) / 100;

        // Start Transaction
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            // Create ROI History
            await ROIHistory.create(
                [
                    {
                        user: investment.user,
                        investment: investment._id,
                        roiAmount,
                        date: today,
                        status: "PROCESSED",
                    },
                ],
                { session }
            );

            // Update User Wallet
            await User.findByIdAndUpdate(
                investment.user,
                {
                    $inc: {
                        walletBalance: roiAmount,
                        totalROIEarned: roiAmount,
                    },
                },
                { session }
            );

            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
};

module.exports = {
    generateDailyROI,
};
