import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const drawerWidth = sidebarOpen ? 240 : 72;

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
            <Navbar
                handleDrawerToggle={handleDrawerToggle}
                handleSidebarToggle={handleSidebarToggle}
                sidebarOpen={sidebarOpen}
            />

            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                sidebarOpen={sidebarOpen}
                handleSidebarToggle={handleSidebarToggle}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    width: {
                        xs: "100%",
                        sm: `calc(100% - ${drawerWidth}px)`,
                    },
                    minHeight: "100vh",
                    transition: "all .3s ease",
                }}
            >
                <Toolbar />
                <Box sx={{ mt: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;