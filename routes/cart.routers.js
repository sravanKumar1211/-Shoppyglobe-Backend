

import { Router } from "express";
import { addToCart, getCart, removeProduct, updateCart } from "../controllers/cart.controller.js"
import verifyToken from "../middleware/verify.js";


const router = Router();
  //route to add existing product in database to cart for user whose token matches given when login 
router.post("/cart",verifyToken,addToCart);
  //updates quantity of product in cart for user with token access
router.put("/cart/:productId",verifyToken,updateCart);
 //remove product from cart for user with token access
    router.delete("/cart/:productId",verifyToken,removeProduct);
      //to get all products in cart for user with token access
    router.get("/cart",verifyToken,getCart);

export default router;
