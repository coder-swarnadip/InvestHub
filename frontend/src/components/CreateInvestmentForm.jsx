import {
    Paper,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
} from "@mui/material";

import { useState } from "react";
import API from "../api/axios";
import plans from "../data/plans";
import useToast from "../utils/useToast";
import Toast from "./Toast";

const CreateInvestmentForm = ({ fetchInvestments }) => {
    const [plan, setPlan] = useState(plans[0]);
    const [amount, setAmount] = useState("");

    const {
        toast,
        showToast,
        closeToast,
    } = useToast();

    const handlePlanChange = (e) => {
        const selectedPlan = plans.find(
            (p) => p.name === e.target.value
        );

        setPlan(selectedPlan);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        amount < plan.minAmount ||
        amount > plan.maxAmount
    ) {
        return showToast(
            "error",
            `Amount must be between ₹${plan.minAmount} and ₹${
                plan.maxAmount === Infinity
                    ? "Unlimited"
                    : plan.maxAmount
            }`
        );
    }

    try {
        const res = await API.post("/investments", {
            amount: Number(amount),
            plan: plan.name,
            duration: Number(plan.duration),
            dailyROIPercentage: plan.dailyROI,
        });

        showToast("success", res.data.message);

        setAmount("");

        fetchInvestments();

    } catch (error) {
        showToast(
            "error",
            error.response?.data?.message ||
                "Investment creation failed.",
            error.response?.status
        );
    }
};
    return (
        <>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" mb={3}>
                    Create Investment
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>
                                    Plan
                                </InputLabel>

                                <Select
                                    value={plan.name}
                                    label="Plan"
                                    onChange={handlePlanChange}
                                >
                                    {plans.map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Investment Amount"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>

                    </Grid>

                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            mt: 3,
                            bgcolor: "#f8f9fa",
                        }}
                    >
                        <Typography>
                            <strong>Plan:</strong> {plan.name}
                        </Typography>

                        <Typography>
                            <strong>Daily ROI:</strong>{" "}
                            {plan.dailyROI}%
                        </Typography>

                        <Typography>
                            <strong>Duration:</strong>{" "}
                            {plan.duration} Days
                        </Typography>

                        <Typography>
                            <strong>Range:</strong> ₹
                            {plan.minAmount} - ₹
                            {plan.maxAmount === Infinity
                                ? "Unlimited"
                                : plan.maxAmount}
                        </Typography>
                    </Paper>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Invest Now
                    </Button>
                </Box>
            </Paper>

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

export default CreateInvestmentForm;