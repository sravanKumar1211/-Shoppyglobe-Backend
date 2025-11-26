import mongoose from "mongoose";

// ======================= Cart Schema =======================
// A Cart belongs to exactly one user.
// The cart contains multiple items.
// Each item references a product and has a quantity.

const cartSchema = new mongoose.Schema(
  {
    //  User who owns this cart
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores User _id
      ref: "User", // References the User collection
      required: true,
      unique: true, // Ensures one user has only one cart
      index: true // Improves lookup performance by user
    },

    //  List of products in the cart
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, // Stores Product _id
          ref: "Product", // References the Product collection
          required: true
        },

        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
          default: 1
        }
      }
    ]
  },

  //  Automatically adds createdAt and updatedAt timestamps
  { timestamps: true }
);

//  Create and export the Cart Model (MongoDB collection will be 'carts')
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
