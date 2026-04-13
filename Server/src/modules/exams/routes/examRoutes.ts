import { Router } from 'express';
import { examController } from '../controllers/examController.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    listExamsValidation,
    createExamValidation,
    updateExamValidation,
    examIdValidation,
} from '../validations/examValidations.js';
import { examLogoUploader } from '../../../utils/index.js';

const router = Router();

router.route('/')
    .get(listExamsValidation, validateFirst, examController.listExams)
    .post(examLogoUploader.single('logo'), createExamValidation, validate, examController.createExam)

router.route('/:id')
    .get(examIdValidation, validate, examController.getExamById)
    .patch(examLogoUploader.single('logo'), updateExamValidation, validate, examController.updateExam)
    .delete(examIdValidation, validate, examController.deleteExam)

export default router;
