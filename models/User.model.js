import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          // ✔ Email format validation (regex)
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address"
      }
    },

    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"]
    }
  },
  { timestamps: true }
);

// Creates user collection in database
export default mongoose.model("User", userSchema);
