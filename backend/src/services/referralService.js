const mongoose = require("mongoose");

const User = require("../models/User");
const ReferralIncome = require("../models/ReferralIncome");

const LEVEL_PERCENTAGES = require("../config/referalLVL");

const distributeReferralIncome = async (investment) => {
    let currentUser = await User.findById(investment.user);

    let level = 1;

    while (
        currentUser.referredBy &&
        LEVEL_PERCENTAGES[level]
    ) {
        const parent = await User.findById(currentUser.referredBy);

        if (!parent) {
            break;
        }

        // Duplicate Check
        const alreadyCredited = await ReferralIncome.findOne({
            receiver: parent._id,
            sourceUser: investment.user,
            level,
        });

        if (!alreadyCredited) {
            const percentage = LEVEL_PERCENTAGES[level];

            const income =
                (investment.amount * percentage) / 100;

            const session = await mongoose.startSession();

            try {
                session.startTransaction();

                await ReferralIncome.create(
                    [
                        {
                            receiver: parent._id,
                            sourceUser: investment.user,
                            level,
                            amount: income,
                        },
                    ],
                    { session }
                );

                await User.findByIdAndUpdate(
                    parent._id,
                    {
                        $inc: {
                            walletBalance: income,
                            totalLevelIncomeEarned: income,
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

        currentUser = parent;
        level++;
    }
};

module.exports = {
    distributeReferralIncome,
};
