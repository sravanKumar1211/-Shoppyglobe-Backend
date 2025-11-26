import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routers.js";
import { notFoundHandler, globalErrorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

// ---------------------------------------------
// DATABASE CONNECTION
// sravankumargaddamedhi_db_user
// Aa6ZknDHD4DEksNe
// ---------------------------------------------
mongoose.connect('mongodb+srv://sravankumargaddamedhi_db_user:Aa6ZknDHD4DEksNe@cluster0.diwezny.mongodb.net/')
.then(function () { console.log("DB Connected") })
.catch(function () { console.log("Err in DB connection") });

// ---------------------------------------------
// MIDDLEWARES
// ---------------------------------------------

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Allow cross-domain requests (CORS)
app.use(cors());

// ---------------------------------------------
// ROUTE MOUNTING (All routes start with /api/)
// ---------------------------------------------
app.use("/api/", productRoutes);
app.use("/api/", userRoutes);
app.use("/api/", cartRoutes);

// ---------------------------------------------
// GLOBAL ERROR HANDLERS
// ---------------------------------------------
app.use(notFoundHandler);     // Handle unknown routes
app.use(globalErrorHandler);  // Handle all other errors

// ---------------------------------------------
// START SERVER
// ---------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on PORT:${PORT}`)
});
