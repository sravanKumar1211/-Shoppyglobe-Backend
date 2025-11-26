import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

/* --------------------------------------------
   VERIFY JWT TOKEN MIDDLEWARE
   -------------------------------------------- */
export default function verifyToken(req, res, next) {
    try {
        // Check if Authorization header contains JWT token
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {

            // Extract and verify token using secret key
            jwt.verify(req.headers.authorization.split(' ')[1], 'SECRETKEY',
                async function (err, verifyToken) {

                    // If token is invalid or expired
                    if (err) {
                        return res.status(403).json({ message: "Invalid JWT token" });
                    }

                    // Fetch user details using decoded user ID
                    const data = await User.findById(verifyToken.id);
                    req.user = data; // Attach user to request object

                    // Proceed to the next middleware or route
                    next();
                });
        }
        // If authorization token is missing
        else return res.status(403).json({ message: "token not found" });
    }
    catch (err) {
        return res.status(500).json({ "error during verifying token": err.message });
    }
}
