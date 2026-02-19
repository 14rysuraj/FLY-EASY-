import { Admin } from "../models/admin.js";
import { User } from "../models/user.js"
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Login First",
            });

        }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id);
            next();
        
    } catch (error) {
        
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

export const isAdminAuthenticated = async (req, res, next) => {

    const { admintoken } = req.cookies;
    if (!admintoken) return res.json({
      success: false,
      message: "Admin Login First",
    });
  
    const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded._id);
  
    next();
  
  
  
  }