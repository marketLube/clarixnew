
import { Router } from 'express';
import { homePageCMSController } from '../controllers/homePageCMScontroller.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { updateHomePageValidation } from '../validations/homePageCMSValidation.js';
import { cmsHomePageUploader } from '../../../../utils/uploader.js';

const router = Router();

// Upload middleware for background media file, location images and career hub assets
const cmsUploadMiddleware = cmsHomePageUploader.fields([
    { name: 'hero[backgroundMedia][backgroundFile]', maxCount: 20 },
    { name: 'location[images][]', maxCount: 50 },
    { name: 'careerHub[images][]', maxCount: 20 },
    { name: 'careerHub[logo][]', maxCount: 20 },
]);

router.route('/')
    .get(homePageCMSController.getHomePage)
    .post(cmsUploadMiddleware, updateHomePageValidation, validate, homePageCMSController.createHomePage)
    .patch(cmsUploadMiddleware, updateHomePageValidation, validate, homePageCMSController.updateHomePage);

export default router;
