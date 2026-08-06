const plans = [
    {
        name: "Launch",
        minAmount: 1000,
        maxAmount: 4999,
        dailyROI: 1,
        duration: 30,
    },
    {
        name: "Boost",
        minAmount: 5000,
        maxAmount: 9999,
        dailyROI: 1.5,
        duration: 45,
    },
    {
        name: "Orbit",
        minAmount: 10000,
        maxAmount: 24999,
        dailyROI: 2,
        duration: 60,
    },
    {
        name: "Nova",
        minAmount: 25000,
        maxAmount: 49999,
        dailyROI: 2.5,
        duration: 90,
    },
    {
        name: "Galaxy",
        minAmount: 50000,
        maxAmount: Infinity,
        dailyROI: 3,
        duration: 120,
    },
];

export default plans;