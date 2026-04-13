import { Router } from 'express';
import { scholarshipController } from '../controllers/scholorshipControllers.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    listScholarshipValidation,
    createScholarshipValidation,
    updateScholarshipValidation,
    scholarshipIdValidation,
} from '../validations/scholorshipValidations.js';

const router = Router();

router.route('/')
    .get(listScholarshipValidation, validateFirst, scholarshipController.listScholarships)
    .post(createScholarshipValidation, validate, scholarshipController.createScholarship);

router.route('/:id')
    .get(scholarshipIdValidation, validate, scholarshipController.getScholarshipById)
    .patch(updateScholarshipValidation, validate, scholarshipController.updateScholarship)
    .delete(scholarshipIdValidation, validate, scholarshipController.deleteScholarship);

export default router;
