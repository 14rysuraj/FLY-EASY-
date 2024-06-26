
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"
import bcrypt from "bcrypt";
import { Post } from "../models/post.js";
import { Booking } from "../models/booking.js";



export const signup = async(req, res) => {
    
    try {
    
        const { email, password, name, phone, address } = req.body;

        let user =await User.findOne({  email });

        if (user) {
            return res.json({
                success: false,
                error: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            email: email,
            password: hashedPassword,
            name: name,
            phone: phone,
            address: address,
        })

        const token = jwt.sign({
            _id: user._id,
            
        },
        process.env.JWT_SECRET,
        
        )

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })
            .json({
            success: true,
            user,
            token,
        })



    
} catch (error) {
    
    res.status(400).json({
        success: false,
        error: error.message,
    });
}    

}


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) return res.json({ success: false, message: "user doesn't exist" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });
  
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      })
      .json({
        token,
        success: true,
        user,
      });
  };
  

export const logout = async(req, res) => {


    try {
        res
        .cookie("token", "", {
          expires: new Date(Date.now()),
        })
        .json({
          sucess: true,
          message: "Log out successfully",
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
   
  };
  

export const profile = async (req, res) => {
      
    const userId = req.user.id;
    
    const user = await User.findById(userId).select("-password");
    const postCount = await Post.countDocuments({
        userId:userId,
    });

    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found",
        })
    }

    res.status(200).json({
        success: true,
        user,
        postCount,
     
    })


}
  
export const tickets = async (req, res) => {

    const userId = req.user.id;

    const bookings = await Booking.find({
        userId: userId,
    }).populate('flightId').populate('passenger');


    if (!bookings) {
        return res.status(404).json({
            success: false,
            message: "Bookings Not Found",
        })
    }
    
    res.status(200).json({
        success: true,
        bookings,
    })
    
}

export const ticketDetails = async (req, res) => {
    
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId).populate('flightId').populate('passenger');

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: "Booking Not Found",
        })
    }

    res.status(200).json({
        success: true,
        booking,
    })

}
