const Investment = require("../models/Investment");
const User = require("../models/User");

const getDashboard = async (req, res) => {
    // Total Investment Amount
    const totalInvestment = await Investment.aggregate([
        {
            $match: {
                user: req.user._id,
                status: "ACTIVE",
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount",
                },
            },
        },
    ]);

    const user = await User.findById(req.user._id).select(
        "walletBalance totalROIEarned totalLevelIncomeEarned"
    );

    res.status(200).json({
        success: true,
        data: {
            totalInvestments:
                totalInvestment.length > 0 ? totalInvestment[0].total : 0,

            totalROIEarned: user.totalROIEarned,

            totalLevelIncomeEarned:
                user.totalLevelIncomeEarned,

            walletBalance: user.walletBalance,
        },
    });
};

module.exports = {
    getDashboard,
};
