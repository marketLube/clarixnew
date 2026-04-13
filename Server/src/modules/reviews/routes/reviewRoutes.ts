import { Router } from 'express';
import { reviewController } from '../controllers/reviewControllers.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    listReviewValidation,
    createReviewValidation,
    updateReviewValidation,
    reviewIdValidation,
} from '../validations/reviewValidations.js';
import { reviewUploader } from '../../../utils/uploader.js';

const router = Router();

router.route('/')
    .get(listReviewValidation, validateFirst, reviewController.listReviews)
    .post(reviewUploader.single('userAvatar'), createReviewValidation, validate, reviewController.createReview);

router.route('/stats')
    .get(validateFirst, reviewController.getReviewStats);


router.route('/:id')
    .get(reviewIdValidation, validate, reviewController.getReviewById)
    .patch(updateReviewValidation, validate, reviewController.updateReview)
    .delete(reviewIdValidation, validate, reviewController.deleteReview);

export default router;
