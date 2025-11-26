import CartModel from "../models/Cart.model.js";
import Product from "../models/Product.model.js"
import mongoose from "mongoose";
//to get cart of user
async function getCartForUser(userid) {
    let cart=await CartModel.findOne({user:userid});//find in cart of that user in cart collection
    if(!cart){
        cart=await CartModel.create({user:userid,items:[]});//create cart if does not exist
    }
    return cart;
}
export async function addToCart(req,res) {
    try{
        const {productId,quantity=1}=req.body;//get details from body
        //check if productId is given and it exists in collection
        if(!productId) return res.status(400).json({"message":"productId required"});
        if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ message: "Invalid productId" });
        //if given quantity exceeds than product stock then return
         if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "product not found" });

        if(product.stock<quantity) return res.status(400).json({"message":"insufficient stock"});
        
       //find cart of that user
        const cart=await getCartForUser(req.user._id);
        //check if product exists in cart
        const idx = cart.items.findIndex(i => i.product.toString() === productId);
       //if yes then add quantity to it
        if (idx > -1) {
            const newQty = cart.items[idx].quantity + quantity;
            if (newQty > product.stock) 
                return res.status(400).json({message:"insufficient stock"});
            
            cart.items[idx].quantity = newQty;
        }
        //else add that product to items
        else cart.items.push({product:productId,quantity});
        await cart.save();//save cart of that user in collection
        return res.status(200).json(cart); 
    }
    catch(err){
        return res.status(500).json({"error occurred during adding product to cart":err.message});
    }
}

export async function updateCart(req,res) {
    try{
        const {productId}=req.params;//get productId from url
         const { quantity } = req.body;//get quantity from body
         //check if quantity and productId is valid or not 
         if(!quantity || quantity<1) return res.status(400).json({message:"invalid quantity"});
         if(!productId) return res.status(400).json({"message":"productId required"});
         if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ message: "Invalid productId" });
         //find cart of that user
        const cart=await getCartForUser(req.user._id);
        //find product from cart
        const item = cart.items.find(i => i.product.toString() === productId);
        //if product not in cart return
        if(!item) return res.status(404).json({message:"Product not in cart"});
        //findById operation on product collection
         const product=await Product.findById(productId);
         //check if product exists and quantity does not exceed
        if(product && product.stock<quantity) return res.status(400).json({"message":"insufficient stock"});
        item.quantity=quantity;//change quantity
        await cart.save();//save changes in collection
        return res.json(cart);
    }
    catch(err){
         return res.status(500).json({"error occurred while updating product quantity to cart":err.message});
    }
}
//remove product from cart
export async function removeProduct(req,res) {
    try{
       const {productId}=req.params;//get productId from url
       //check if productId is valid or not
        if(!productId) return res.status(400).json({"message":"productId required"});
        if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ message: "Invalid productId" });
        const cart=await getCartForUser(req.user._id);//cart of that user
          //find product from cart
        const item = cart.items.find(i => i.product.toString() === productId);
        //if product not in cart return
        if(!item) return res.status(404).json({message:"Product not in cart"});
        const newItems=cart.items.filter(i=>i.product.toString()!==productId);//get all products in cart except given product
        cart.items=newItems;
        await cart.save();//save to collection
        return res.json(cart);
    }
    catch(err){
         return res.status(500).json({"error occurred while removing product from cart":err.message});
    }
}
//get cart of that user
export async function getCart(req,res) {
    try{
        const cart=await getCartForUser(req.user._id);
        await cart.populate('items.product');
        return res.json(cart);
    }
    catch(err){
         return res.status(500).json({"error occurred while fetching cart":err.message});
    }
}