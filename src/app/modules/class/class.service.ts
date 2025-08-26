import { Class, Prisma, Student } from '@prisma/client';
import prisma from '../../utils/prisma';
import { classSearchableFields } from './class.constant';
import { paginationHelper } from '../../utils/pagination';
import { IPaginationOptions } from '../../interface/pagination';

const getAllClassesFromDB = async (
  params: any,
  options: IPaginationOptions,
): Promise<{
  meta: { page: number; limit: number; total: number };
  data: Class[];
}> => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ClassWhereInput[] = [];

  // Search
  if (searchTerm) {
    andConditions.push({
      OR: classSearchableFields.map((field) => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  // Filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: { equals: (filterData as any)[key] },
      })),
    });
  }

  const whereConditions: Prisma.ClassWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.class.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
  });

  const total = await prisma.class.count({ where: whereConditions });

  return {
    meta: { page, limit, total },
    data: result,
  };
};
const createClassIntoDB = async (
  payload: ICreateClassPayload,
): Promise<Class> => {
  return await prisma.class.create({
    data: {
      name: payload.name,
      section: payload.section,
    },
  });
};

const enrollStudentIntoClass = async (
  classId: string,
  studentId: string,
): Promise<Student> => {
  const student = await prisma.student.update({
    where: { id: studentId },
    data: { classId },
    include: { class: true },
  });

  return student;
};

const getStudentsOfClassFromDB = async (
  classId: string,
): Promise<Student[]> => {
  const students = await prisma.student.findMany({
    where: { classId },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  });

  return students;
};

export const classService = {
  getAllClassesFromDB,
  createClassIntoDB,
  enrollStudentIntoClass,
  getStudentsOfClassFromDB,
};
