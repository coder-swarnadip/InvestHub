const ReferralIncome = require("../models/ReferralIncome");

const getReferralIncomeHistory = async (req, res) => {
    const history = await ReferralIncome.find({
        receiver: req.user._id,
    })
    .populate("sourceUser", "fullName email")
    .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: history.length,
        data: history,
    });
};

module.exports = {
    getReferralIncomeHistory,
};