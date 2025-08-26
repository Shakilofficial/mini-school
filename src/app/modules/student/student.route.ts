import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { Role } from '@prisma/client';
import { studentValidationSchemas } from './student.validation';
import { studentController } from './student.controller';

const router = Router();

// Create Student (Admin Only)

router.post(
  '/',
  auth(Role.ADMIN),
  validateRequest(studentValidationSchemas.createStudentZodSchema),
  studentController.createStudent,
);

// Get All Students (Admin and Teacher)

router.get(
  '/',
  auth(Role.ADMIN, Role.TEACHER),
  studentController.getAllStudents,
);

// Get Student Details by ID (Admin and Teacher)

router.get(
  '/:id',
  auth(Role.ADMIN, Role.TEACHER),
  studentController.getStudentDetailsById,
);

export const studentRoutes = router;
