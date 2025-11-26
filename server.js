import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routers.js";
import { notFoundHandler, globalErrorHandler } from "./middleware/errorHandler.js";
import cors from "cors";


const app=express();

// sravankumargaddamedhi_db_user
// Aa6ZknDHD4DEksNe
mongoose.connect('mongodb+srv://sravankumargaddamedhi_db_user:Aa6ZknDHD4DEksNe@cluster0.diwezny.mongodb.net/')
.then(function(){console.log("DB Connected")})
.catch(function(){console.log("Err in DB connection")});

// middlewares that handles both json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//to enable to work on different domain
app.use(cors());

// Mount product routes with a base path
app.use("/api/", productRoutes);  
app.use("/api/", userRoutes);  
app.use("/api/", cartRoutes);  
// Now all product routes start with /api/v1
//global errorhandler
app.use(notFoundHandler);
app.use(globalErrorHandler);


const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on PORT:${PORT}`)
})






