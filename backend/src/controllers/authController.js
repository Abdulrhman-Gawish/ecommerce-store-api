const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const signup = async (req, res, next) => {
  const { name, email, password, role, profileImage } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      profileImage,
    });
    await newUser.save();

    payload = {
      userId: newUser._id,
      role: newUser.role,
    };
  
    // jwt
    console.log(generateTokenAndSetCookie(res, payload));

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    payload = {
      userId: user._id,
      role: user.role,
    };

    const token = generateTokenAndSetCookie(res, payload);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
const checkAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
