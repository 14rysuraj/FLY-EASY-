
import express from 'express';
import { deleteFlight, modifySearch, searchFlights, updateFlight } from '../controllers/flight.js';
import { createFlight } from '../controllers/createFlight.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/search', searchFlights);
router.post('/create', createFlight);
router.get('/modify', isAuthenticated, modifySearch);
router.put('/update/:id', updateFlight);
router.delete('/delete/:id',  deleteFlight);



export default router;