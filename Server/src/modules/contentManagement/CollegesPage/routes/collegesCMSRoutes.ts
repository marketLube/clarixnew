import { Router } from 'express';
import { collegesCMSController } from '../controllers/collegesCMSController.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateCollegesCMSValidation } from '../validations/collegesCMSValidation.js';

const router = Router();

router.route('/')
    .get(collegesCMSController.getCollegesPage)
    .patch(updateCollegesCMSValidation, validate, collegesCMSController.updateCollegesPage);

export default router;
