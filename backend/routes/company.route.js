import express from 'express';
import { getAllCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAuthentication from '../middlewares/isAuthenticated.js';
const router = express.Router();


router.route("/registerCompany").post(isAuthentication, registerCompany);
router.route("/get/").get(isAuthentication, getAllCompany);
router.route("/get/:id").get(isAuthentication, getCompanyById);
router.route("/update/:id").put(isAuthentication, updateCompany);

export default router;