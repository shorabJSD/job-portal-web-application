import express from 'express';
const router = express.Router();
import isAuthentication from '../middlewares/isAuthenticated.js';
import { getAdminJobsPost, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

router.route("/jobpost").post(isAuthentication, postJob);
router.route("/get").get(isAuthentication, getAllJobs);
router.route("/getadminjobs/:id").get(isAuthentication, getAdminJobsPost);
router.route("/get/:id").get(isAuthentication, getJobById);

export default router;