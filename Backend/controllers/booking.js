import { Booking } from "../models/booking.js";
import { Flight } from "../models/flight.js";
import { Passenger } from "../models/passenger.js";

export const bookFlight = async (req, res) => {
    


    try {

        const { flightId, seatsBooked, passenger } = req.body;
        const userId = req.user._id;


        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(400).json({
                success: false,
                message: "Flight not found",
            });
        }
        if (flight.seatsAvailable < seatsBooked) {
            return res.status(400).json({
                success: false,
               message: "No seats available",
            });
        }

        const passengers = await Promise.all(passenger.map(async (p) => {
            const newPassenger = new Passenger(p);
            await newPassenger.save();
            return newPassenger._id;

        }))

        const booking = new Booking({
            userId: userId,
            flightId: flightId,
            seatsBooked: seatsBooked,
            passenger: passengers,
            totalPrice: flight.price * seatsBooked,
           
        })

        await booking.save();


        flight.seatsAvailable -= seatsBooked;
        await flight.save();
        res.status(201).json({
            success: true,
            booking,
           message:"Booked successfully"
        });


        
    } catch (error) {
        
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

export const updateBooking = async (req, res) => {
    


    try {

        const { bookingId ,flightId} = req.params;
   

    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
        return res.status(404).json({
            success: false,
            message: "Booking Not Found",
        })
    }
    
    const flight = await Flight.findById(flightId);
    if (!flight) {
        return res.status(404).json({
            success: false,
            message: "Flight Not Found",
        })
    }

    booking.flightId = flight._id;
    

    await booking.save();

    res.json({
        success: true,
        booking,
        message: "Booking Updated Successfully",
    })


        
    } catch (error) {
        
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }

    


}


export const cancelBooking = async (req, res) => {
    
    try {

        const { bookingId } = req.params;
        const userId = req.user._id;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found",
            })
        }
        if (booking.userId.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const seat = booking.seatsBooked;

        const flight = await Flight.findById(booking.flightId);
        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Flight Not Found",
            })
        }
        flight.seatsAvailable = flight.seatsAvailable + seat;
        await flight.save();
        await booking.deleteOne({ _id: bookingId });
        res.status(200).json({
            success: true,
            message: "Booking Cancelled Successfully",
        });

        
    }

    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}