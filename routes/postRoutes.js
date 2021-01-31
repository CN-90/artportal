import express from 'express';
import protectRoute from '../middleware/auth.js';
import {
  createPost,
  getPostById,
  deletePostById,
  getAllPosts,
} from './../controllers/postController.js';

const router = express.Router();

router
  .route('/:id')
  .get(protectRoute, getPostById)
  .delete(protectRoute, deletePostById);
router.route('/').get(getAllPosts).post(protectRoute, createPost);

export default router;
