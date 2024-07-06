const express = require ("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController.js");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth.js");


const router = express.Router();

router.route("/products")
.get( getAllProducts);

router.route("/products/new").post( isAuthenticatedUser,authorizeRoles("admin"), createProduct);

router
    .route("/product/:id")
    .put(isAuthenticatedUser, updateProduct)
    .delete(isAuthenticatedUser, deleteProduct)
    .get(getProductDetails);

    router.route("/product/:id").get(getProductDetails);

module.exports = router;

