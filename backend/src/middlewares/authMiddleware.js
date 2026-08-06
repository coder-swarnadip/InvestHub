const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "Access denied. No token provided.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        throw new ApiError(401, "User not found.");
    }

    req.user = user;

    next();
};

module.exports = protect;