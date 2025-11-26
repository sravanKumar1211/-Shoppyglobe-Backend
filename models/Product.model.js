import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      unique: true,
      maxlength: [120, "Product title must not exceed 120 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 90%"],
    },

    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
    },

    brand: {
      type: String,
      trim: true,
      lowercase: true,
    },

    category: {
      type: String,
      trim: true,
      lowercase: true,
      index: true, // Faster for filtering by category
    },

    thumbnail: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },

    images: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr),
        message: "Images must be an array of string URLs",
      },
      default: [],
    },
  },
  { timestamps: true }
);



const Product = mongoose.model("Product", productSchema);
export default Product;
