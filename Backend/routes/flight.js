
import express from 'express';
import { searchFlights } from '../controllers/flight.js';
import { createFlight } from '../controllers/createFlight.js';

const router = express.Router();

router.get('/search', searchFlights);
router.post('/create', createFlight);



export default router;