import { Router } from 'express';
import { jobController } from '../controllers/jobControllers.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    listJobValidation,
    createJobValidation,
    updateJobValidation,
    jobIdValidation,
} from '../validations/jobValidations.js';

const router = Router();

router.route('/')
    .get(listJobValidation, validateFirst, jobController.listJobs)
    .post(createJobValidation, validate, jobController.createJob);

router.route('/:id')
    .get(jobIdValidation, validate, jobController.getJobById)
    .patch(updateJobValidation, validate, jobController.updateJob)
    .delete(jobIdValidation, validate, jobController.deleteJob);

export default router;
