const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: [true, "Mobile number is required"],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        referralCode: {
            type: String,
            required: true,
            unique: true,
        },

        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        walletBalance: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalROIEarned: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalLevelIncomeEarned: {
            type: Number,
            default: 0,
            min: 0,
        },

        accountStatus: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "BLOCKED"],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return ;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
