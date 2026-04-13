import { Router } from 'express';
import { coursesCMSController } from '../controllers/coursesCMSController.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateCoursesCMSValidation } from '../validations/coursesCMSValidation.js';

const router = Router();

router.route('/')
    .get(coursesCMSController.getCoursesPage)
    .patch(updateCoursesCMSValidation, validate, coursesCMSController.updateCoursesPage);

export default router;
