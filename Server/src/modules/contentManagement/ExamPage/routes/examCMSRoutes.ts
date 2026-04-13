import { Router } from 'express';
import { examCMSController } from '../controllers/examCMSController.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateExamCMSValidation } from '../validations/examCMSValidation.js';

const router = Router();

router.route('/')
    .get(examCMSController.getExamPage)
    .patch(updateExamCMSValidation, validate, examCMSController.updateExamPage);

export default router;
