import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
   
})

export const Passenger = mongoose.model('Passenger', passengerSchema);
