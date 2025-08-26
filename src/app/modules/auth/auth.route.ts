import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// Login User

router.post('/login', authController.loginUser);

// Refresh Token

router.post('/refresh-token', authController.refreshToken);

// Logout User

router.post('/logout', authController.logoutUser);

export const authRoutes = router;
