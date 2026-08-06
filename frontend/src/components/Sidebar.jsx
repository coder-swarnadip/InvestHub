import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SavingsIcon from "@mui/icons-material/Savings";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({
    mobileOpen,
    handleDrawerToggle,
    sidebarOpen,
}) => {
    const location = useLocation();

    const drawerWidth = sidebarOpen ? 240 : 70;

    const menuItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/dashboard",
        },
        {
            text: "Investments",
            icon: <SavingsIcon />,
            path: "/investments",
        },
        {
            text: "Referrals",
            icon: <GroupIcon />,
            path: "/referrals",
        },
        {
            text: "Profile",
            icon: <PersonIcon />,
            path: "/profile",
        },
    ];

    const drawer = (
        <>
            <Toolbar />

           
            <Divider sx={{ borderColor: "#334155" }} />

            <List sx={{ mt: 1 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                        onClick={() => {
                            if (window.innerWidth < 600) {
                                handleDrawerToggle();
                            }
                        }}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 2,
                            color: "white",
                            justifyContent: sidebarOpen ? "flex-start" : "center",
                            px: sidebarOpen ? 1.5 : 1,

                            "&.Mui-selected": {
                                backgroundColor: "#2563eb",
                                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                            },

                            "&.Mui-selected:hover": {
                                backgroundColor: "#1d4ed8",
                            },

                            "&:hover": {
                                backgroundColor: "#334155",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: "inherit",
                                minWidth: sidebarOpen ? 40 : 0,
                                justifyContent: "center",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        {sidebarOpen && (
                            <ListItemText
                                primary={item.text}
                            />
                        )}
                    </ListItemButton>
                ))}
            </List>
        </>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: {
                    sm: drawerWidth,
                },
                flexShrink: {
                    sm: 0,
                },
                transition: "all .3s",
            }}
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },

                    "& .MuiDrawer-paper": {
                        width: 240,
                        backgroundColor: "#0f172a",
                        color: "white",
                        borderRight: "none",
                        boxShadow: "0 0 24px rgba(15, 23, 42, 0.18)",
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",
                    },

                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        overflowX: "hidden",
                        transition: "width .3s ease",
                        backgroundColor: "#0f172a",
                        color: "white",
                        borderRight: "none",
                        boxShadow: "0 0 24px rgba(15, 23, 42, 0.18)",
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;