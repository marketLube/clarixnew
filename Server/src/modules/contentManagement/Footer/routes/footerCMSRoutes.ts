import { Router } from 'express';
import { footerCMSController } from '../controllers/footerCMSController.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateFooterCMSValidation } from '../validations/footerCMSValidation.js';

const router = Router();

router.route('/')
    .get(footerCMSController.getFooter)
    .post(updateFooterCMSValidation, validate, footerCMSController.createFooter)
    .patch(updateFooterCMSValidation, validate, footerCMSController.updateFooter);

export default router;
