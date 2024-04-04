import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
     },
     flightId: {
        type:mongoose.Schema.ObjectId,
        ref: 'Flight',
        required: true,
     },
     bookingDate: {
        type: Date,
        default: Date.now,
     },
     seatsBooked: {
        type: Number,
        required: true,
        min: 1,
     },
     totalPrice: {
        type: Number,
        required: true,
        min: 0,
     },
     paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
     },
     seatNumbers: {
        type: [String],
        required: false,
   },
     
   passenger: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Passenger',
      required: true,
      
     }],



})


export const Booking = mongoose.model('Booking', bookingSchema);