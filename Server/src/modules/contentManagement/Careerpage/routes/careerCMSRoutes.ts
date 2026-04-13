import { Router } from 'express';
import { careersCMSController } from '../controllers/careerCMSControllers.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateCareersCMSValidation } from '../validations/careerCMSvalidation.js';
import { cmsCareerPageUploader } from '../../../../utils/uploader.js';

const router = Router();

// Upload middleware for second section images
const cmsUploadMiddleware = cmsCareerPageUploader.fields([
    { name: 'secondSection[images]', maxCount: 10 },
]);

router.route('/')
    .get(careersCMSController.getCareersPage)
    .post(cmsUploadMiddleware, updateCareersCMSValidation, validate, careersCMSController.createCareersPage)
    .patch(cmsUploadMiddleware, updateCareersCMSValidation, validate, careersCMSController.updateCareersPage);

export default router;
