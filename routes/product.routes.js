import { Router } from "express";
import { getProducts, getproductbyid } from "../controllers/product.controller.js";

const router = Router();

// ---------------------------------------------
// PRODUCT ROUTES
// ---------------------------------------------

// Get all products from the database
router.get("/products", getProducts);

// Get a specific product using its ID
router.get("/product/:id", getproductbyid);

// Export product routes
export default router;
