import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import Toast from "./Toast";
import useToast from "../utils/useToast";

const Navbar = ({
    handleDrawerToggle,
    handleSidebarToggle,
    sidebarOpen,
}) => {
    const navigate = useNavigate();

    const { toast, showToast, closeToast } = useToast();

    const drawerWidth = sidebarOpen ? 240 : 70;

    const handleLogout = async () => {
        try {
            const res = await API.post("/auth/logout");

            showToast("success", res.data.message);

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            showToast(
                "error",
                error.response?.data?.message || "Logout failed.",
                error.response?.status
            );
        }
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: "#2563eb",
                    color: "#ffffff",
                    borderBottom: "1px solid #1d4ed8",
                    boxShadow: "0 4px 16px rgba(37, 99, 235, 0.22)",

                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`,
                    },

                    ml: {
                        sm: `${drawerWidth}px`,
                    },

                    transition: "all .3s ease",

                    zIndex: (theme) =>
                        theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: { xs: 64, sm: 72 },
                        px: { xs: 2, sm: 3 },
                    }}
                >
                    {/* Mobile Drawer Button */}

                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            display: {
                                xs: "flex",
                                sm: "none",
                            },
                            mr: 1.5,
                            color: "#ffffff",
                            borderRadius: 2,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Desktop Collapse Button */}

                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleSidebarToggle}
                        sx={{
                            display: {
                                xs: "none",
                                sm: "flex",
                            },
                            mr: 1.5,
                            color: "#ffffff",
                            borderRadius: 2,
                        }}
                    >
                        {sidebarOpen ? (
                            <MenuOpenIcon />
                        ) : (
                            <MenuIcon />
                        )}
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: "0.02em",
                            color: "#ffffff",
                        }}
                    >
                        InvestHub
                    </Typography>

                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            px: 1.5,
                            bgcolor: "#ffffff",
                            color: "#2563eb",
                            fontWeight: 600,
                            boxShadow: "none",
                            "&:hover": {
                                bgcolor: "#eff6ff",
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

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

export default Navbar;