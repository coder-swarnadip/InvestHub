import {
    Box,
    Button,
    Typography,
} from "@mui/material";

import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const NotFound = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                bgcolor: "#0f172a",
                color: "white",
                px: 3,
            }}
        >

            <ReportProblemIcon
                sx={{
                    fontSize: 90,
                    color: "#2563eb",
                }}
            />

            <Typography
                variant="h1"
                sx={{
                    fontWeight: 800,
                    fontSize: {
                        xs: "5rem",
                        md: "7rem",
                    },
                    color: "#2563eb",
                }}
            >
                404
            </Typography>


            <Typography
                variant="h5"
                sx={{
                    fontWeight: 600,
                    mb: 1,
                }}
            >
                Page Not Found
            </Typography>


            <Typography
                sx={{
                    color: "#94a3b8",
                    mb: 4,
                }}
            >
                Sorry, the page you are looking for does not exist.
            </Typography>


           

        </Box>
    );
};

export default NotFound;