
import express from 'express';
import { login, logout, profile, signup, ticketDetails, tickets } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/profile', isAuthenticated, profile);
router.get('/tickets', isAuthenticated, tickets);
router.get('/ticket/details/:id', isAuthenticated, ticketDetails);




export default router;
