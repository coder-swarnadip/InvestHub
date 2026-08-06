import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { Grid, Paper, Typography } from "@mui/material";

const COLORS = [
    "#1976d2",
    "#2e7d32",
    "#ed6c02",
    "#9c27b0",
    "#d32f2f",
];

const DashboardCharts = ({
    roiHistory = [],
    investments = [],
}) => {
    // Line Chart Data
    const lineData = roiHistory.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
        }),
        roi: item.roiAmount,
    }));

    // Pie Chart Data
    const planCounts = {};

    investments.forEach((inv) => {
        planCounts[inv.plan] =
            (planCounts[inv.plan] || 0) + 1;
    });

    const pieData = Object.keys(planCounts).map(
        (plan) => ({
            name: plan,
            value: planCounts[plan],
        })
    );

    return (
        <Grid
            container
            spacing={3}
            sx={{ mt: 2 }}
        >
            {/* Earnings Line Chart */}
            <Grid size={{ xs: 12, md: 8 }}>
                <Paper
                    elevation={3}
                    sx={{ p: 3 }}
                >
                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        ROI Earnings Trend
                    </Typography>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <LineChart
                            data={lineData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="roi"
                                stroke="#1976d2"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>

            {/* Investment Distribution Pie Chart */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                    elevation={3}
                    sx={{ p: 3 }}
                >
                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        Investment Distribution
                    </Typography>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                dataKey="value"
                                label
                            >
                                {pieData.map(
                                    (
                                        entry,
                                        index
                                    ) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardCharts;