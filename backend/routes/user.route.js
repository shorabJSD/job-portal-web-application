import express from 'express';
import { Login, Register, udateProfile } from '../controllers/user.controller.js';
const router = express.Router();
router.route('/login').post(Login)
router.route('/register').post(Register);
router.route('/profile/update').post(udateProfile);