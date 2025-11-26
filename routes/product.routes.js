import { Router } from "express";
import { getProducts, getproductbyid } from "../controllers/product.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getproductbyid);

export default router;
