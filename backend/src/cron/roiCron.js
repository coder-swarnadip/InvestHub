const cron = require("node-cron");
const { generateDailyROI } = require("../services/roiService");

const startROICron = () => {
    // Runs every day at 12:00 AM
    cron.schedule("0 0 * * *", async () => {
        console.log("Running Daily ROI Cron...");

        try {
            await generateDailyROI();
            console.log("Daily ROI generated successfully.");
        } catch (error) {
            console.error("ROI Cron Error:", error.message);
        }
    });
};

module.exports = startROICron;
