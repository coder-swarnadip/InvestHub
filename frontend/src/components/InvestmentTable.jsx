import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const InvestmentTable = ({ investments }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{ mt: 4 }}
        >
            <Typography
                variant="h6"
                sx={{ p: 2 }}
            >
                Investment History
            </Typography>

            <Table>

                <TableHead>

                    <TableRow>
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Plan</b></TableCell>
                        <TableCell><b>Daily ROI %</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                        <TableCell><b>Start Date</b></TableCell>
                        <TableCell><b>End Date</b></TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>

                    {investments.map((investment) => (

                        <TableRow key={investment._id}>

                            <TableCell>
                                ₹ {investment.amount}
                            </TableCell>

                            <TableCell>
                                {investment.plan}
                            </TableCell>

                            <TableCell>
                                {investment.dailyROIPercentage}%
                            </TableCell>

                            <TableCell>
                                {investment.status}
                            </TableCell>

                            <TableCell>
                                {new Date(
                                    investment.startDate
                                ).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                                {new Date(
                                    investment.endDate
                                ).toLocaleDateString()}
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </TableContainer>
    );
};

export default InvestmentTable;