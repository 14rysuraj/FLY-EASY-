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