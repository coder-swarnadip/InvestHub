const Investment = require("../models/Investment");
const ApiError = require("../utils/ApiError");
const { distributeReferralIncome } = require("../services/referralService");

// Create Investment
const createInvestment = async (req, res) => {
   const {
    amount,
    plan,
    duration,
    dailyROIPercentage,
} = req.body;

// console.log("Request Body:", req.body);
// console.log("Duration:", duration);
// console.log("Type:", typeof duration);

    // Calculate dates
    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Number(duration));
    
// console.log("Start Date:", startDate);
// console.log("End Date:", endDate);
// console.log("Is Valid:", !isNaN(endDate.getTime()));


  const investment = await Investment.create({
    user: req.user._id,
    amount,
    plan,
    startDate,
    endDate,
    dailyROIPercentage,
});

    await distributeReferralIncome(investment);

    res.status(201).json({
        success: true,
        message: "Investment created successfully.",
        data: investment,
    });
};






// View Logged-in User Investments
const getUserInvestments = async (req, res) => {
    const investments = await Investment.find({
        user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: investments.length,
        data: investments,
    });
};

module.exports = {
    createInvestment,
    getUserInvestments,
};
