import { Prisma, Role, Student, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import { IPaginationOptions } from '../../interface/pagination';
import { paginationHelper } from '../../utils/pagination';
import { studentSearchAbleFields } from './student.constant';

const createStudentIntoDB = async (
  payload: ICreateStudentPayload,
): Promise<Student> => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.$transaction(async (tx) => {
    // Create User
    const user = await tx.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        passwordHash: hashedPassword,
        role: Role.STUDENT,
      },
    });

    // Create Student linked with the User
    const createdStudent = await tx.student.create({
      data: {
        name: payload.student.name,
        age: payload.student.age,
        classId: payload.student.classId,
        userId: user.id,
      },
    });

    return createdStudent;
  });

  return result;
};

const getAllStudentsFromDB = async (
  params: any,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.StudentWhereInput[] = [];

  // Search
  if (searchTerm) {
    andConditions.push({
      OR: studentSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include: {
      class: true,
      user: true,
    },
  });

  const total = await prisma.student.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getStudentDetailsByIdFromDB = async (
  id: string,
): Promise<Student | null> => {
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      class: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return student;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentDetailsByIdFromDB,
};
