
import express from 'express';
import { bookFlight, cancelBooking, updateBooking } from '../controllers/booking.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post('/bookFlight', isAuthenticated, bookFlight);
router.put('/updateBooking/:bookingId/:flightId', isAuthenticated, updateBooking);
router.delete('/cancelBooking/:bookingId', isAuthenticated, cancelBooking);



export default router;