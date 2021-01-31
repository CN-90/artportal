import express from 'express';
const router = express.Router();

import protectRoute from './../middleware/auth.js';
import {
  uploadImage,
  uploadUserImage,
  uploadBanner,
} from './../controllers/imageController.js';

router.route('/image-upload').post(protectRoute, uploadImage);
router.route('/image-upload/:id').post(protectRoute, uploadUserImage);
router.route('/image-upload/:id/banner').post(protectRoute, uploadBanner);

export default router;
