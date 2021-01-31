import express from 'express';
import {
  loginUser,
  registerUser,
  followUser,
  unfollowUser,
  getUserById,
  updateUser,
} from './../controllers/userController.js';
import protectRoute from './../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/:id').get(getUserById).put(protectRoute, updateUser);
router.route('/login').post(loginUser);
router.route('/:id/follow').put(protectRoute, followUser);
router.route('/:id/unfollow').put(protectRoute, unfollowUser);

export default router;
