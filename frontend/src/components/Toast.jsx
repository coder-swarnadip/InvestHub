import { Snackbar, Alert } from "@mui/material";

const Toast = ({
    open,
    severity,
    message,
    statusCode,
    onClose,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "middle",
            }}
        >
            <Alert
                severity={severity}
                variant="filled"
                onClose={onClose}
                sx={{ width: "40%" }}
            >
                {statusCode && <strong>Error {statusCode}: </strong>}
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;