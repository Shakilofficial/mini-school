import z from 'zod';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().min(6),
  }),
});

export const studentValidationSchemas = {
  createStudentZodSchema,
};
