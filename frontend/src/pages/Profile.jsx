import {
    Avatar,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useEffect, useState } from "react";

import API from "../api/axios";
import Toast from "../components/Toast";
import useToast from "../utils/useToast";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        toast,
        showToast,
        closeToast,
    } = useToast();

    const fetchProfile = async () => {
        try {
            const res = await API.get("/auth/profile");

            setUser(res.data.data);
        } catch (error) {
            showToast(
                "error",
                error.response?.data?.message ||
                    "Failed to load profile.",
                error.response?.status
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const copyReferralCode = () => {
        navigator.clipboard.writeText(user.referralCode);

        showToast(
            "success",
            "Referral code copied successfully."
        );
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={10}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Card
                sx={{
                    maxWidth: 700,
                    mx: "auto",
                    mt: 4,
                    borderRadius: 3,
                }}
            >
                <CardContent>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={3}
                    >
                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                bgcolor: "primary.main",
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 50 }} />
                        </Avatar>

                        <Typography
                            variant="h5"
                            mt={2}
                            fontWeight="bold"
                        >
                            {user.fullName}
                        </Typography>

                        <Typography color="text.secondary">
                            {user.email}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>

                        <Grid size={{ xs: 6 }}>
                            <Typography fontWeight="bold">
                                Mobile
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            {user.mobile}
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography fontWeight="bold">
                                Referral Code
                            </Typography>
                        </Grid>

                        <Grid
                            size={{ xs: 6 }}
                            display="flex"
                            alignItems="center"
                        >
                            <Typography>
                                {user.referralCode}
                            </Typography>

                            <IconButton
                                size="small"
                                onClick={copyReferralCode}
                            >
                                <ContentCopyIcon
                                    fontSize="small"
                                />
                            </IconButton>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography fontWeight="bold">
                                Wallet Balance
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            ₹ {user.walletBalance}
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography fontWeight="bold">
                                Total ROI Earned
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            ₹ {user.totalROIEarned}
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography fontWeight="bold">
                                Total Level Income
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            ₹ {user.totalLevelIncomeEarned}
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography fontWeight="bold">
                                Account Status
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography
                                color={
                                    user.accountStatus === "ACTIVE"
                                        ? "success.main"
                                        : "error.main"
                                }
                                fontWeight="bold"
                            >
                                {user.accountStatus}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography fontWeight="bold">
                                Joined On
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            {new Date(
                                user.createdAt
                            ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>

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

export default Profile;