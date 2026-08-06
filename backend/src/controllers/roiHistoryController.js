const ROIHistory = require("../models/RoiHistory");

const getROIHistory = async (req, res) => {
    const history = await ROIHistory.find({
        user: req.user._id,
    })
    .populate("investment", "plan amount")
    .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: history.length,
        data: history,
    });
};

module.exports = {
    getROIHistory,
};