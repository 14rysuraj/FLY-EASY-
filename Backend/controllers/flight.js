  import { Booking } from "../models/booking.js";
import { Flight } from "../models/flight.js";
import { User } from "../models/user.js";

export const searchFlights = async (req, res) => {
  try {
    const { departureAirport, arrivalAirport, departureDate } = req.query;

    // Initialize query object
    const query = {};

    // Add departureAirport to query if provided
    if (departureAirport) {
      query.departureAirport = departureAirport;
    }

    // Add arrivalAirport to query if provided
    if (arrivalAirport) {
      query.arrivalAirport = arrivalAirport;
    }

    // Add departureDate to query if provided
    if (departureDate) {
      // Convert departureDate to a Date object
      const departureDateDate = new Date(departureDate);
      query.departureDate = { $eq: departureDateDate };
    }

    // Ensure there are seats available
    query.seatsAvailable = { $gt: 0 };

    // Search flights
    const flights = await Flight.find(query);

    res.status(200).json({
      success: true,
      flights,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const modifySearch = async (req, res) => {
  try {
    const { bookingId, email } = req.query; // Changed from req.body to req.query
    const userId = req.user?._id;           // Ensure req.user._id is available



    // Basic input validation
    if (!bookingId || !email) {
      return res.json({ // Changed to 400 for bad request
        success: false,
        message: "Booking ID and email are required",
      });
    }

    // Find booking by ID
    const booking = await Booking.findById(bookingId).populate('flightId');
    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Verify the user and booking ownership
    if (booking.userId.toString() === userId.toString() && userId.toString() === user._id.toString()) {
      return res.status(200).json({
        success: true,
        booking,
      });
    } else {
      return res.json({
        success: false,
        message: "Provided details do not exist",
      });
    }

  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error('Error in modifySearch:', error);

    // Respond with a generic server error message
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};



export const updateFlight = async (req, res) => {
  try {

    const { id } = req.params;


    const {
      airline,
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      price,
      seatsAvailable,
    } = req.body;

  
    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    flight.airline = airline || flight.airline;
    flight.flightNumber = flightNumber || flight.flightNumber;
    flight.departureAirport = departureAirport || flight.departureAirport;
    flight.arrivalAirport = arrivalAirport || flight.arrivalAirport;
    flight.departureDate = departureDate || flight.departureDate;
    flight.arrivalDate = arrivalDate || flight.arrivalDate;
    flight.departureTime = departureTime || flight.departureTime;
    flight.arrivalTime = arrivalTime || flight.arrivalTime;
    flight.price = price || flight.price;
    flight.seatsAvailable = seatsAvailable || flight.seatsAvailable;


    await flight.save();

    res.json({
      success: true,
      message: "Flight updated successfully",
      flight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



export const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;

    await Booking.deleteMany({ flightId: id });

    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    await flight.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Flight and all associated bookings deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

