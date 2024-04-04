
import express from 'express';
import { bookFlight } from '../controllers/booking.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post('/bookFlight',isAuthenticated, bookFlight);



export default router;