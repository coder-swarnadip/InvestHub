import { useState } from "react";

const useToast = () => {
    const [toast, setToast] = useState({
        open: false,
        severity: "success",
        message: "",
        statusCode: null,
    });

    const showToast = (severity, message, statusCode = null) => {
        setToast({
            open: true,
            severity,
            message,
            statusCode,
        });
    };

    const closeToast = () => {
        setToast((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return {
        toast,
        showToast,
        closeToast,
    };
};

export default useToast;