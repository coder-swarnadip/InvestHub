import {
    Paper,
    Typography,
    Box,
    Avatar,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

const TreeNode = ({ node, level = 0 }) => {
    return (
        <Box
            sx={{
                ml: level * 5,
                mt: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    width: 320,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Avatar>
                    <PersonIcon />
                </Avatar>

                <Box>
                    <Typography variant="h6">
                        {node.user.fullName}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {node.user.referralCode}
                    </Typography>
                </Box>
            </Paper>

            {node.referrals &&
                node.referrals.map((child) => (
                    <TreeNode
                        key={child.user._id}
                        node={child}
                        level={level + 1}
                    />
                ))}
        </Box>
    );
};

const ReferralTree = ({ tree }) => {
    if (!tree || tree.length === 0) {
        return (
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h5">
                    Referral Tree
                </Typography>

                <Typography sx={{ mt: 2 }}>
                    No referrals found.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" mb={3}>
                Referral Tree
            </Typography>

            {tree.map((node) => (
                <TreeNode
                    key={node.user._id}
                    node={node}
                />
            ))}
        </Paper>
    );
};

export default ReferralTree;