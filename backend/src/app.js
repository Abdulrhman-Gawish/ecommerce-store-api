const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/dbconn");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoute");
const couponRoutes = require("./routes/couponRoute");
const paymentRoutes = require("./routes/paymentRoute");
const analyticsRoutes = require("./routes/analyticsRoutes");
const categoryRoutes = require("./routes/categoryRoute");
const app = express();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));//Transf to Dynamic in  VARIABLE

connectDB();
// Routes

app.use("/", authRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/payments", analyticsRoutes);
app.use("/api/category", categoryRoutes);

app.use(errorHandler);

module.exports = app;
