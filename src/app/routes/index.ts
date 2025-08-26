import { Router } from 'express';
import { classRoutes } from '../modules/class/class.routes';
import { studentRoutes } from '../modules/student/student.route';
import { authRoutes } from '../modules/auth/auth.route';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/class',
    route: classRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
