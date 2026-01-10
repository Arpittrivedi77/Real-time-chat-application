import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    // 1️⃣ Get token from headers (either as 'authorization' or 'token')
    const token = req.headers.token;

    
    // 2️⃣ Verify token properly
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
     // 3️⃣ Find user in database
    const user = await User.findById(decoded.userId).select("-password");


    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // 4️⃣ Attach user to request and continue
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};


