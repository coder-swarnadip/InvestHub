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

const RoiTable = ({ roiHistory }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
                ROI History
            </Typography>

            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell><b>ROI Amount</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {roiHistory.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                No ROI history found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        roiHistory.map((roi) => (
                            <TableRow key={roi._id}>

                                <TableCell>
                                    {new Date(roi.date).toLocaleDateString()}
                                </TableCell>

                                <TableCell>
                                    ₹ {roi.roiAmount}
                                </TableCell>

                                <TableCell>
                                    {roi.status}
                                </TableCell>

                            </TableRow>
                        ))
                    )}

                </TableBody>

            </Table>

        </TableContainer>
    );
};

export default RoiTable;