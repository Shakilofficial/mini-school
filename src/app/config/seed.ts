import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import config from '.';

export const seedAdmin = async () => {
  try {
    const isExistAdmin = await prisma.user.findFirst({
      where: {
        email: config.admin_email,
        role: Role.ADMIN,
      },
    });

    if (isExistAdmin) {
      console.log('Admin already exists!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      config.admin_password as string,
      Number(config.bcrypt_salt_rounds),
    );

    // Create Admin
    const admin = await prisma.user.create({
      data: {
        name: 'System Admin',
        email: config.admin_email as string,
        passwordHash: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log('Admin created successfully!', admin);
  } catch (err) {
    console.error('Error seeding admin:', err);
  } finally {
    await prisma.$disconnect();
  }
};

seedAdmin();
