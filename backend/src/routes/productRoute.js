const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const productController = require("../controllers/productController");
const checkRole = require("../middlewares/checkRole");
const userRole = require("../utils/enums/userRole");
const upload = require("../middlewares/upload");

router
  .route("/products")
  .get(
    verifyToken,
    checkRole([userRole.CUSTOMER]),
    productController.getProducts
  )
  .post(
    verifyToken,
    checkRole([userRole.ADMIN, userRole.SELLER]),
    upload.array("images", 5), // validate date before added
    productController.addProduct
  );

// // Upload multiple images (e.g., up to 5)
// router.route("/products").post(
//   verifyToken,
//   checkRole([userRole.ADMIN, userRole.SELLER]),
//   upload.array("images", 5), // validate date before added
//   productController.addProduct
// );

router
  .route("/seller/products")
  .get(
    verifyToken,
    checkRole([userRole.SELLER]),
    productController.getProductsForSeller
  );

router// 👉 added
  .route("/seller/products/pending")
  .get(
    verifyToken,
    checkRole([userRole.SELLER]),
    productController.getPendingProductsForSeller
  );


router
  .route("/admin/products")
  .get(
    verifyToken,
    checkRole([userRole.ADMIN]),
    productController.getProductsForAdminToApprove
  );

router

router
  .route('/products/:productId')
  .get(productController.getProductById)
  
  .delete(
    verifyToken,
    checkRole([userRole.ADMIN, userRole.SELLER]),
    productController.deleteProduct
  )
  
  .patch(
    verifyToken,
    checkRole([userRole.SELLER]),
    productController.updateProduct
  );

router
  .route("/admin/products/:productId/approve")
  .patch(
    verifyToken,
    checkRole(userRole.ADMIN),
    productController.updateProductStatusToApproved
  );
router
  .route("/admin/products/:productId/reject")
  .patch(
    verifyToken,
    checkRole(userRole.ADMIN),
    productController.updateProductStatusToRejected
  );

router
  .route("/category/:category")
  .get(
    verifyToken,
    checkRole([userRole.CUSTOMER]),
    productController.getProductsByCategory
  );

module.exports = router;
