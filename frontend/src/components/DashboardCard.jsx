import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value }) => {
    return (
        <Card elevation={3}>
            <CardContent>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mt={1}
                >
                    ₹ {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;