import { Router } from 'express';
import { universityController } from '../controllers/universityController.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    createUniversityValidation,
    updateUniversityValidation,
    listUniversitiesValidation,
    getUniversityByIdValidation,
    deleteUniversityValidation,
} from '../validations/universityValidations.js';

const router = Router();

router.get('/', listUniversitiesValidation, validateFirst, universityController.listUniversities);

router.post('/', createUniversityValidation, validate, universityController.createUniversity);

router.patch('/:id', updateUniversityValidation, validate, universityController.updateUniversity);

router.get('/:id', getUniversityByIdValidation, validate, universityController.getUniversityById);

router.delete('/:id', deleteUniversityValidation, validate, universityController.deleteUniversity);

export default router;

