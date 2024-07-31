import express from 'express';
import { Login, Logout, Register,  updateProfile } from '../controllers/user.controller.js';
import isAuthentication from '../middlewares/isAuthenticated.js';
const router = express.Router();
router.route('/login').get(Login)
router.route('/register').post(Register);
router.route('/logout').get(Logout)
router.route('/profile/update/:id').put( isAuthentication, updateProfile);

export default router;