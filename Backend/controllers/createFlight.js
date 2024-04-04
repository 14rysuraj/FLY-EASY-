import { Flight } from "../models/flight.js";

export const createFlight = async (req, res) => {
  try {
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
      
      
      const newFlight = new Flight({
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
      })
      
      await newFlight.save();

      res.status(201).json({
        success: true,
        newFlight,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
