import { Router } from 'express';
import { streamController } from '../controllers/StreamController.js';
import { validate, validateFirst } from '../../../middlewares/validate.middleware.js';
import {
    createStreamValidation,
    updateStreamValidation,
    listStreamsValidation,
    getStreamByIdValidation,
    deleteStreamValidation,
} from '../validations/streamValidations.js';
import { generalUploader } from '../../../utils/index.js';

const router = Router();

const streamUploadMiddleware = generalUploader.fields([
    { name: 'image', maxCount: 1 },
]);

router.get('/', listStreamsValidation, validateFirst, streamController.listStreams);

router.post('/', streamUploadMiddleware, createStreamValidation, validate, streamController.createStream);

router.patch('/:id', streamUploadMiddleware, updateStreamValidation, validate, streamController.updateStream);

router.get('/:id', getStreamByIdValidation, validate, streamController.getStreamById);

router.delete('/:id', deleteStreamValidation, validate, streamController.deleteStream);

router.patch('/:id/toggle', getStreamByIdValidation, validate, streamController.toggleStreamStatus);

export default router;

