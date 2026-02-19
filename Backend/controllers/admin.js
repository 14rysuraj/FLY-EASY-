import { Admin } from "../models/admin.js";
import { Booking } from "../models/booking.js";
import { Flight } from "../models/flight.js";
import { User } from "../models/user.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const userDetails = async (req,res) => {
    
    try {
    
        const users = await User.find();





        res.status(200).json({
            success: true,
          users
        });




    
} catch (error) {
        
    res.status(400).json({
        success: false,
        error: error.message,
    });
}

}

export const bookingDetails = async (req, res) => {

    try {

        const bookings = await Booking.find().populate('userId').populate('flightId');

        res.status(200).json({
            success: true,
            bookings,
        });
        
    

    
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    

    }
}

export const flightDetails = async (req, res) => {
    
    try {
        const flights = await Flight.find();
        res.status(200).json({
            success: true,
            flights,
        });


        
    }

    catch (error) {
        
    
        res.status(400).json({
            success: false,
            error: error.message,
        });
    

    }
}



export const adminlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email: email }).select("+password");
  
      if (!admin) {
        return res.json({
          success: false,
          message: "Admin doesn't exist",
        });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
  
      if (!isMatch)
        return res.json({
          success: false,
          message: "Invalid Email or Password",
        });
  
      const admintoken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
  
      res
        .cookie("admintoken", admintoken, {
          httpOnly: true,
          maxAge: 30 * 60 * 1000,
        })
        .json({
          admintoken,
          success: true,
          message: "Admin Logged In Successfully",
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  export const adminRegister = async (req, res) => {
    const { email, password } = req.body;
  
    let admin = await Admin.findOne({ email: email });
    if (admin) {
      return res.status(404).json({
        success: false,
        message: "Admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  
    admin = await Admin.create({
      email,
      password: hashedPassword,
    });
  
    const admintoken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
  
    res
      .cookie("admintoken", admintoken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      })
      .json({
        success: true,
        admin,
      });
  };


  export const adminLogout = (req, res) => {
    res.clearCookie("admintoken");
    res.json({
      success: true,
      message: "Admin Logged out successfully",
    });
  };

  export const adminProfile = (req, res) => {
    res.json({
      success: true,
      admin: req.admin,
    });
  };