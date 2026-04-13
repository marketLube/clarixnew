import { Router } from 'express';
import { blogCMSController } from '../controllers/blogCMSControllers.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateBlogCMSValidation } from '../validations/blogCMSvalidation.js';
import { cmsBlogPageUploader } from '../../../../utils/index.js';

const router = Router();

// Upload middleware for newsletter image
const cmsBlogUploadMiddleware = cmsBlogPageUploader.fields([
    { name: 'newsletter[imageFile]', maxCount: 1 },
]);

router.route('/')
    .get(blogCMSController.getBlogPage)
    .post(cmsBlogUploadMiddleware, updateBlogCMSValidation, validate, blogCMSController.createBlogPage)
    .patch(cmsBlogUploadMiddleware, updateBlogCMSValidation, validate, blogCMSController.updateBlogPage);

export default router;
