import { Router } from 'express';
import { recruiterController } from '../controllers/recruiterController.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    listRecruitersValidation,
    createRecruiterValidation,
    updateRecruiterValidation,
    getRecruiterByIdValidation,
    deleteRecruiterValidation,
} from '../validations/recruiterValidations.js';
import { generalUploader } from '../../../utils/index.js';

const router = Router();

const recruiterUploadMiddleware = generalUploader.fields([
    { name: 'logo', maxCount: 1 },
]);

router.route('/')
    .get(listRecruitersValidation, validateFirst, recruiterController.listRecruiters)
    .post(recruiterUploadMiddleware, createRecruiterValidation, validate, recruiterController.createRecruiter);

router.route('/:id')
    .get(getRecruiterByIdValidation, validate, recruiterController.getRecruiterById)
    .patch(recruiterUploadMiddleware, updateRecruiterValidation, validate, recruiterController.updateRecruiter)
    .delete(deleteRecruiterValidation, validate, recruiterController.deleteRecruiter);

export default router;
