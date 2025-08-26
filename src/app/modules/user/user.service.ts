import prisma from '../../utils/prisma';
import { IJwtPayload } from '../../interface/common';
import { Prisma, User } from '@prisma/client';
import { userSearchAbleFields } from './user.constant';
import { IPaginationOptions } from '../../interface/pagination';
import { paginationHelper } from '../../utils/pagination';

const getAllUsersFromDB = async (
  params: any,
  options: IPaginationOptions,
): Promise<{
  meta: { page: number; limit: number; total: number };
  data: User[];
}> => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  // Search
  if (searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch users
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result as User[],
  };
};

const getMyProfile = async (authUser: IJwtPayload) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: authUser?.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

export const userService = {
  getAllUsersFromDB,
  getMyProfile,
};
