import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { Role } from '@prisma/client';
import { classValidationSchemas } from './class.validation';
import { classController } from './class.controller';

const router = Router();

// Only ADMIN and TEACHER can get all classes
router.get('/', auth(Role.ADMIN, Role.TEACHER), classController.getAllClasses);

// Create new class (Admin only)
router.post(
  '/',
  auth(Role.ADMIN),
  validateRequest(classValidationSchemas.createClassSchema),
  classController.createClass,
);

// Enroll student into a class (Admin/Teacher)
router.post(
  '/:id/enroll',
  auth(Role.ADMIN, Role.TEACHER),
  validateRequest(classValidationSchemas.enrollStudentSchema),
  classController.enrollStudent,
);

// Get students of a class (Admin/Teacher)
router.get(
  '/:id/students',
  auth(Role.ADMIN, Role.TEACHER),
  classController.getStudentsOfClass,
);

export const classRoutes = router;
