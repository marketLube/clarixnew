import { Router } from 'express';
import { aboutCMSController } from '../controllers/aboutCMSControllers.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateAboutCMSValidation } from '../validations/aboutCMSvalidation.js';

const router = Router();

router.route('/')
    .get(aboutCMSController.getAboutPage)
    .post(updateAboutCMSValidation, validate, aboutCMSController.createAboutPage)
    .patch(updateAboutCMSValidation, validate, aboutCMSController.updateAboutPage);

export default router;
