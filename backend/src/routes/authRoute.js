const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const authController = require("../controllers/authController");
const multer = require("multer"); 
const authMiddleware = require("../middlewares/authMiddleware");

const storage = multer.memoryStorage(); // keeps el image f el buffer l7d ma a3mlha encoding w a5znha f el db
const upload = multer({ storage });

// Auth Routes
router.post("/signup", upload.single("profileImage"), authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/checkAuth", verifyToken, authController.checkAuth);

// ✅ Route to get current user info from JWT for viewing role-specific home pages -> seller ->seller-home
router.get("/me", authMiddleware, (req, res) => {
  const { id, name, role } = req.user;
  res.status(200).json({ id, name, role });
});

module.exports = router;
