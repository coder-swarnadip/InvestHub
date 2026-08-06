const User = require("../models/User");

// ==========================
// Get Direct Referrals
// ==========================
const getDirectReferrals = async (req, res) => {
    const referrals = await User.find({
        referredBy: req.user._id,
    }).select("-password -__v");

    res.status(200).json({
        success: true,
        count: referrals.length,
        data: referrals,
    });
};


const buildReferralTree = async (userId) => {
    const referrals = await User.find({
        referredBy: userId,
    }).select("-password -__v");

    const tree = [];

    for (const referral of referrals) {
        tree.push({
            user: referral,
            referrals: await buildReferralTree(referral._id),
        });
    }

    return tree;
};

const getReferralTree = async (req, res) => {
    const tree = await buildReferralTree(req.user._id);

    res.status(200).json({
        success: true,
        data: tree,
    });
};


module.exports = {
    getDirectReferrals,
    getReferralTree,
};