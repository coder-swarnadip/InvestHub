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

const ReferralTable = ({ referralHistory }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{ mt: 4 }}
        >
            <Typography
                variant="h6"
                sx={{ p: 2 }}
            >
                Referral Income History
            </Typography>

            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell><b>Source User</b></TableCell>
                        <TableCell><b>Level</b></TableCell>
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Date</b></TableCell>
                     
                    </TableRow>
                </TableHead>

                <TableBody>

                    {referralHistory.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                align="center"
                            >
                                No referral income found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        referralHistory.map((income) => (
                            <TableRow key={income._id}>

                                <TableCell>
                                    {income.sourceUser?.fullName}
                                </TableCell>

                                <TableCell>
                                    Level {income.level}
                                </TableCell>

                                <TableCell>
                                    ₹ {income.amount}
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        income.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>


                            </TableRow>
                        ))
                    )}

                </TableBody>

            </Table>
        </TableContainer>
    );
};

export default ReferralTable;