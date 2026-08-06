import {
    Avatar,
    Box,
    Button,
    Container,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import API from "../api/axios";
import Toast from "../components/Toast";
import useToast from "../utils/useToast";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

   const {
    toast,
    showToast,
    closeToast,
} = useToast();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

   

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await API.post("/auth/login", formData);

        showToast("success", res.data.message);

        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);

    } catch (error) {
        showToast(
            "error",
            error.response?.data?.message ||
            "Something went wrong.",
            error.response?.status
        );
    }
};

    return (
        <>
            <Container maxWidth="xs">
                <Paper
                    elevation={5}
                    sx={{
                        mt: 10,
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography variant="h5" mb={3}>
                            Login
                        </Typography>

                        <Box
                            component="form"
                            width="100%"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                type="password"
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                sx={{ mt: 3 }}
                            >
                                Login
                            </Button>

                            <Typography mt={2} align="center">
                                Don't have an account?{" "}
                                <Link href="/register">
                                    Register
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

export default Login;