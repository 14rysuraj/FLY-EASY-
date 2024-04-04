import { Flight } from "../models/flight.js";

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
