import mongoose from "mongoose";

// ---------------------------------------------
// USER SCHEMA DEFINITION
// ---------------------------------------------
const userSchema = new mongoose.Schema(
  {
    // User full name
    name: { type: String, required: true, trim: true },

    // Unique user email with validation
    email: {
      type: String,
      required: true,
      unique: true,         // No two users can have same email
      trim: true,
      lowercase: true,      // Store email in lowercase
      validate: {
        // Validate correct email format using regex
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address"
      }
    },

    // User password (stored as hashed in DB usually)
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"] // Minimum security
    }
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// ---------------------------------------------
// CREATE & EXPORT USER MODEL
// ---------------------------------------------
export default mongoose.model("User", userSchema);
