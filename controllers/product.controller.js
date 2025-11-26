import Product from "../models/Product.model.js";
import mongoose from "mongoose";

/* --------------------------------------------
   GET ALL PRODUCTS
   -------------------------------------------- */
export async function getProducts(req, res) {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // If no products found
        if (!products) {
            return res.status(404).json({ "message": "products are not Found" });
        }

        // Send products list as response
        return res.status(200).json({ products });
    }
    catch (err) {
        return res.status(500).json({ "Error while fetching products": err.message });
    }
}

/* --------------------------------------------
   GET SPECIFIC PRODUCT BY ID
   -------------------------------------------- */
export async function getproductbyid(req, res) {
    try {
        const id = req.params.id; // Extract product ID from URL

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        // Find product by ID
        const product = await Product.findById(id);

        // If product with given ID doesn't exist
        if (!product) {
            return res.status(404).json({ "message": "Currently product with Id not Exists" });
        }

        // Send product as response
        return res.status(200).json({ product });
    }
    catch (err) {
        return res.status(500).json({ "Error while fetching product": err.message });
    }
}
