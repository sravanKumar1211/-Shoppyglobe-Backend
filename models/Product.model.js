import mongoose from "mongoose";

// ---------------------------------------------
// PRODUCT SCHEMA DEFINITION
// ---------------------------------------------
const productSchema = new mongoose.Schema(
  {
    // Product title (must be unique)
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      unique: true,
      maxlength: [120, "Product title must not exceed 120 characters"],
    },

    // Detailed product description
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },

    // Product price (cannot be negative)
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    // Quantity available in stock
    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    // Discount percentage on product
    discountPercentage: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 90%"],
    },

    // Product rating (0 to 5)
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
    },

    // Brand name (stored in lowercase)
    brand: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // Product category (indexed for faster searching)
    category: {
      type: String,
      trim: true,
      lowercase: true,
      index: true, // Index improves search performance
    },

    // Thumbnail image URL (required field)
    thumbnail: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },

    // Multiple product image URLs (must be array of strings)
    images: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr),
        message: "Images must be an array of string URLs",
      },
      default: [],
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// ---------------------------------------------
// CREATE AND EXPORT PRODUCT MODEL
// ---------------------------------------------
const Product = mongoose.model("Product", productSchema);
export default Product;
