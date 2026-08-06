import {
    Avatar,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";
import Toast from "../components/Toast";
import useToast from "../utils/useToast";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        referredBy: "",
    });

    const { toast, showToast, closeToast } = useToast();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/register", formData);

            showToast("success", res.data.message);

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            showToast(
                "error",
                error.response?.data?.message || "Something went wrong.",
                error.response?.status
            );
        }
    };

    return (
        <>
            <Container maxWidth="sm">
                <Paper
                    elevation={5}
                    sx={{
                        mt: 5,
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                mb: 2,
                            }}
                        >
                            <PersonAddIcon />
                        </Avatar>

                        <Typography
                            variant="h5"
                            mb={3}
                        >
                            Create Account
                        </Typography>

                        <Box
                            component="form"
                            width="100%"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Mobile Number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Referral Code (Optional)"
                                name="referredBy"
                                value={formData.referredBy}
                                onChange={handleChange}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                sx={{ mt: 3 }}
                            >
                                Register
                            </Button>

                            <Typography
                                mt={2}
                                align="center"
                            >
                                Already have an account?{" "}
                                <Link to="/">
                                    Login
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>

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

export default Register;