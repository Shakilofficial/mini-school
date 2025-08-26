import { Router } from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { userController } from './user.controller';

const router = Router();

// Only ADMIN can get all users
router.get('/', auth(Role.ADMIN), userController.getAllUsers);

// Logged-in user can view their profile
router.get(
  '/me',
  auth(Role.ADMIN, Role.TEACHER, Role.STUDENT),
  userController.getMyProfile,
);

export const userRoutes = router;
