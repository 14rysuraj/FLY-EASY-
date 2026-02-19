import express from 'express';
import { adminLogout, adminProfile, adminRegister, adminlogin, bookingDetails, flightDetails, userDetails } from '../controllers/admin.js';
import { isAdminAuthenticated } from '../middlewares/auth.js';

const router = express.Router();
router.post('/login', adminlogin);
router.post('/register', adminRegister);
router.get('/logout', adminLogout);
router.get('/profile',isAdminAuthenticated, adminProfile);
router.get('/users', userDetails);
router.get('/bookings', bookingDetails);
router.get('/flights', flightDetails);




export default router;

