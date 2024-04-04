
import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/database.js';
import flightRoutes from "./routes/flight.js"
import userRoutes from "./routes/user.js"
import bookRoutes from "./routes/booking.js";
import cookieParser from 'cookie-parser';

const app = express();




dotenv.config({
    path:"config/config.env",
})
const port = process.env.PORT ||4000;


//database configuration
connectDB();



//using middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());




//routes

app.use('/api/flights', flightRoutes);
app.use('/api/user', userRoutes)
app.use('/api', bookRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})