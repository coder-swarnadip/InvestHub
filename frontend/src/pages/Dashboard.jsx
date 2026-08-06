import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import API from "../api/axios";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";


import { Paper} from "@mui/material";
import DashboardCharts from "../components/EarningChart";

import InvestmentTable from "../components/InvestmentTable";
import RoiTable from "../components/RoiTable";
import ReferralTable from "../components/RefetralTable";

import Toast from "../components/Toast";
import useToast from "../utils/useToast";

const Dashboard = () => {

//     const chartData = [
//     { day: "Mon", earning: 120 },
//     { day: "Tue", earning: 200 },
//     { day: "Wed", earning: 150 },
//     { day: "Thu", earning: 250 },
//     { day: "Fri", earning: 180 },
//     { day: "Sat", earning: 300 },
//     { day: "Sun", earning: 220 },
// ];


    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const [investments, setInvestments] = useState([]);
    const [roiHistory, setRoiHistory] = useState([]);
    const [referralHistory, setReferralHistory] = useState([]);



    const { toast, showToast, closeToast } = useToast();

useEffect(() => {
    fetchDashboard();
    fetchInvestments();
    fetchRoiHistory();
    fetchReferralHistory();
}, []);


const fetchReferralHistory = async () => {
    try {

        const res = await API.get("/referral-income");

        setReferralHistory(res.data.data);

    } catch (error) {

        showToast(
            "error",
            error.response?.data?.message ||
                "Unable to load referral history",
            error.response?.status
        );

    }
};


const fetchRoiHistory = async () => {
    try {
        const res = await API.get("/roi-history");
        setRoiHistory(res.data.data);
    } catch (error) {
        showToast(
            "error",
            error.response?.data?.message || "Unable to fetch ROI history",
            error.response?.status
        );
    }
};

    const fetchInvestments = async () => {
    try {

        const res = await API.get("/investments");

        setInvestments(res.data.data);

    } catch (error) {

        showToast(
            "error",
            error.response?.data?.message || "Unable to fetch investments",
            error.response?.status
        );

    }
};

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/dashboard");

            setDashboard(res.data.data);

        } catch (error) {
            showToast(
                "error",
                error.response?.data?.message || "Failed to load dashboard",
                error.response?.status
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={8}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
           
            <Box p={4}>

                <Typography variant="h4" mb={3}>
                    Dashboard
                </Typography>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <DashboardCard
                            title="Total Investments"
                            value={dashboard.totalInvestments}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <DashboardCard
                            title="Wallet Balance"
                            value={dashboard.walletBalance}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <DashboardCard
                            title="Daily ROI"
                            value={dashboard.totalROIEarned}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <DashboardCard
                            title="Level Income"
                            value={dashboard.totalLevelIncomeEarned}
                        />
                    </Grid>

                </Grid>

            </Box>

            <DashboardCharts
    roiHistory={roiHistory}
    investments={investments}
/>
<InvestmentTable investments={investments} />
<RoiTable roiHistory={roiHistory} />
<ReferralTable
    referralHistory={referralHistory}
/>


            <Toast
                open={toast.open}
                severity={toast.severity}
                message={toast.message}
                statusCode={toast.statusCode}
                onClose={closeToast}
            />
        </>
    );
};

export default Dashboard;