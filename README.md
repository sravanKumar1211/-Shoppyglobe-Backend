# -Shoppyglobe-Backend
G.sravan Kumar
Git Hub:- ("https://github.com/sravanKumar1211/-Shoppyglobe-Backend")


🛍️ ShoppyGlobe – E-Commerce Backend API
📌 About the Project

ShoppyGlobe is a fully functional E-commerce Backend built using Node.js, Express.js, MongoDB Atlas (Cloud DB), JWT & bcrypt.
It supports User Authentication, Product APIs, and Protected Cart APIs.

👉 MongoDB Atlas is configured with global network access using 0.0.0.0/0, so this project can be tested from any system without changing configuration.

🌐 Cloud Database Access: 0.0.0.0/0

✔ The project uses MongoDB Atlas as the database.
✔ IP Access is set to:

0.0.0.0/0


🔐 This means: Database is accessible from any IP, so any developer can clone this project and test the API on their system without setup changes.

⚠ Note: This is allowed only because the DB user has limited access (read/write only). No admin privileges are exposed.

🚀 Tech Stack
Technology	Usage
Node.js + Express.js	Backend Server & Routing
MongoDB Atlas	Cloud Database
Mongoose	ODM Mapping
JWT	User Authentication
Bcrypt	Password Encryption
CORS	Cross-Domain Access
ThunderClient/Postman	API Testing
📦 Features Implemented

✔ User Registration & Login
✔ Password Encryption (bcrypt)
✔ JWT Token Authentication
✔ Fetch All Products / Fetch Single Product
✔ Direct Data Inserted into MongoDB Atlas
✔ Add to Cart / Update Quantity / Remove Cart Item
✔ Get Cart with Product Details (populate)
✔ Centralized Error Handling
✔ Email Format Validation
✔ Atlas Access Enabled for Everyone (0.0.0.0/0)

📁 Project Structure
📦 ShoppyGlobe-Backend
├── server.js
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   └── cart.model.js
├── routes/
│   ├── user.routes.js
│   ├── product.routes.js
│   └── cart.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── product.controller.js
│   └── cart.controller.js
└── middleware/
    ├── auth.middleware.js
    └── errorHandler.js

🧠 How to Run the Project
📌 1. Clone the Repository
git clone https://github.com/<your-username>/Shoppyglobe-Backend.git

📌 2. Navigate to Project Folder
cd Shoppyglobe-Backend

📌 3. Install Dependencies
npm install

📌 4. Start the Server
node server.js

🟢 Server Runs On:
http://localhost:3000


PORT = 3000 is hardcoded in server.js (not dynamic).

🧪 How to Test API (Step-by-Step)
📌 Test Using ThunderClient or Postman
🔐 1) User Authentication
📍 Register - POST /api/register

Request Body

{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}

📍 Login - POST /api/login

Request Body

{
  "email": "john@example.com",
  "password": "123456"
}


📌 Copy the Auth Token from Login Response
This Token is required for Cart APIs.

🛍️ 2) Product APIs
📍 Get All Products - GET /api/products
📍 Get Product by ID - GET /api/product/:id

⚠ Data is inserted directly into MongoDB Atlas (not via API).

🛒 3) Cart APIs (Require Token)

📌 Add Token to Headers:

Authorization: Bearer YOUR_TOKEN_HERE

➕ Add to Cart - POST /api/cart
{
  "productId": "<MongoDB_Product_ID>",
  "quantity": 2
}

🔄 Update Quantity - PUT /api/cart
{
  "productId": "<MongoDB_Product_ID>",
  "quantity": 5
}

❌ Remove Item - DELETE /api/cart
{
  "productId": "<MongoDB_Product_ID>"
}

🛒 Get User Cart - GET /api/cart
🛑 Error Handling Summary

✔ notFoundHandler for undefined routes
✔ globalErrorHandler for server crash prevention
✔ Proper HTTP Status Codes returned:

400 (Bad Request)

401 (Unauthorized)

404 (Not Found)

500 (Server Error)

🌱 Future Enhancements

🔹 Admin Panel (Product CRUD)
🔹 Product Filters & Search
🔹 Orders & Checkout System
🔹 Cloud Image Upload (Cloudinary)
🔹 Refresh Tokens & Logout Feature

🤝 Contributions

✨ Contributions & suggestions are welcome!

