const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");
const generateReferralCode = require("../utils/generateReferralCode");
const cookieOpp= require("../utils/cookieOpp");

// Register User

const register = async (req, res) => {
    const {
        fullName,
        email,
        mobile,
        password,
        referredBy,
    } = req.body;

    // Check existing email or mobile
    const existingUser = await User.findOne({
        $or: [{ email }, { mobile }],
    });

    if (existingUser) {
        throw new ApiError(
            400,
            "User already exists with this email or mobile."
        );
    }

    // Check referral code
    let parentUser = null;

    if (referredBy) {
        parentUser = await User.findOne({
            referralCode: referredBy,
        });

        if (!parentUser) {
            throw new ApiError(404, "Invalid referral code.");
        }
    }

   
    let referralCode;
    let isExists = true;

    while (isExists) {
        referralCode = generateReferralCode();

        const codeExists = await User.findOne({ referralCode });

        if (!codeExists) {
            isExists = false;
        }
    }

    // Create user
    const user = await User.create({
        fullName,
        email,
        mobile,
        password,
        referralCode,
        referredBy: parentUser ? parentUser._id : null,
    });

   
    const createdUser = await User.findById(user._id).select("-password -__v");

   
    const token = generateToken(user._id);

  res
    .status(201)
    .cookie("token", token, cookieOpp)
    .json({
        success: true,
        message: "Registration successful.",
        data: createdUser,
    });
};

// =========================
// Login User
// =========================
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid email or password.");
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password.");
    }

    // Generate JWT
    const token = generateToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -__v");

    res
    .status(200)
    .cookie("token", token, cookieOpp)
    .json({
        success: true,
        message: "Login successful.",
        data: loggedInUser,
    });
};

// =========================
// Get Logged In User
// =========================
const getProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
};

const logout = async (req, res) => {
   res
    .status(200)
    .clearCookie("token", cookieOpp)
    .json({
        success: true,
        message: "Logout successful.",
    });
}

module.exports = {
    register,
    login,
    getProfile,
    logout
};