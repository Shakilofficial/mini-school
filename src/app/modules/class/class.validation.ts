import z from 'zod';

const createClassSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Class name is required'),
    section: z.string().min(1, 'Section is required'),
  }),
});

const enrollStudentSchema = z.object({
  body: z.object({
    studentId: z.string().uuid('Valid studentId is required'),
  }),
});

export const classValidationSchemas = {
  createClassSchema,
  enrollStudentSchema,
};
