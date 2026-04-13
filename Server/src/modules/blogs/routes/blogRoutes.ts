import { Router, type RequestHandler } from 'express';
import { blogController } from '../controllers/blogController.js';
import { generalUploader } from '../../../utils/index.js';

const router = Router();

const blogUploadMiddleware: RequestHandler = generalUploader.fields([
    { name: 'thumbnail', maxCount: 1 },
]);

router.get('/', blogController.listBlogs);
router.post('/', blogUploadMiddleware, blogController.createBlog);
router.get('/:id', blogController.getBlogById);
router.patch('/:id', blogUploadMiddleware, blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
