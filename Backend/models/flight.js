import mongoose from "mongoose";


const flightSchema = new mongoose.Schema({
    
    airline: {
        type: String,
        required: true,
        trim: true,
     },
     flightNumber: {
        type: String,
        required: true,
        trim: true,
     },
     departureAirport: {
        type: String,
        required: true,
        trim: true,
     },
     arrivalAirport: {
        type: String,
        required: true,
        trim: true,
     },
     departureDate: {
        type: Date,
        required: true,
     },
     arrivalDate: {
        type: Date,
        required: true,
   },
   departureTime: {
      type: String,
      required: true,
   },
   
   arrivalTime: {
      type: String,
      required: true,
   },
   
     
     
     price: {
        type: Number,
        required: true,
        min: 0,
     },
     seatsAvailable: {
        type: Number,
        required: true,
        min: 0,
   },
     
    
})

export const Flight =mongoose.model('Flight',flightSchema);