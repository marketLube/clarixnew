import { Router } from 'express';
import { collegeController } from '../controllers/collegeControllers.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    createCollegeValidation,
    updateCollegeValidation,
    listCollegesValidation,
    getCollegeByIdValidation,
    deleteCollegeValidation,
} from '../validations/CollegeValidations.js';
import { collegeFilesUploader } from '../../../utils/index.js';

const router = Router();

const collegeUploadMiddleware = collegeFilesUploader.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'brochure', maxCount: 1 },
    { name: 'campusLifeImages', maxCount: 20 },
    { name: 'campusImages', maxCount: 10 },
    { name: 'hostelImages', maxCount: 10 },
    { name: 'labsImages', maxCount: 10 },
    { name: 'eventsImages', maxCount: 10 },
]);

router.route('/')
    .get(listCollegesValidation, validateFirst, collegeController.listColleges)
    .post(collegeUploadMiddleware, createCollegeValidation, validate, collegeController.createCollege)

router.route('/:id')
    .get(getCollegeByIdValidation, validate, collegeController.getCollegeById)
    .delete(deleteCollegeValidation, validate, collegeController.deleteCollege)
    .patch(collegeUploadMiddleware, updateCollegeValidation, validate, collegeController.updateCollege);

export default router;