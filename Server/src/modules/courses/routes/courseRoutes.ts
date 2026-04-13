import { Router } from 'express';
import { courseController } from '../controllers/courseController.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    createCourseValidation,
    updateCourseValidation,
    listCoursesValidation,
    getCourseByIdValidation,
    deleteCourseValidation,
} from '../validations/courseValidations.js';
import { courseImagesUploader } from '../../../utils/index.js';

const router = Router();

const courseUploadMiddleware = courseImagesUploader.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 },
    { name: 'descriptionImage', maxCount: 1 },
]);

router.get('/', listCoursesValidation, validateFirst, courseController.listCourses);
router.post('/', courseUploadMiddleware, createCourseValidation, validate, courseController.createCourse);

router.patch('/:id', courseUploadMiddleware, updateCourseValidation, validate, courseController.updateCourse);

router.get('/:id', getCourseByIdValidation, validate, courseController.getCourseById);

router.delete('/:id', deleteCourseValidation, validate, courseController.deleteCourse);

export default router;
