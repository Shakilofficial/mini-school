import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { createToken, verifyToken } from '../../utils/token';

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.passwordHash,
  );

  if (!isCorrectPassword) {
    throw new Error('Password incorrect!');
  }
  const accessToken = createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err) {
    throw new Error('You are not authorized!');
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
