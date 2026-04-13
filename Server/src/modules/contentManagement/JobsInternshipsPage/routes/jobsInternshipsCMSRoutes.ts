import { Router } from 'express';
import { jobsInternshipsCMSController } from '../controllers/jobsInternshipsCMSController.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateJobsInternshipsCMSValidation } from '../validations/jobsInternshipsCMSValidation.js';

const router = Router();

router.route('/')
    .get(jobsInternshipsCMSController.getJobsInternshipsPage)
    .patch(updateJobsInternshipsCMSValidation, validate, jobsInternshipsCMSController.updateJobsInternshipsPage);

export default router;
