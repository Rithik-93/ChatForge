import axios from "axios";
import { randomUUID } from "crypto";
import prisma from "../prisma/src";
const CDN_BASE_UPLOAD_URL = process.env.CDN_BASE_UPLOAD_URL;
const CDN_BASE_ACCESS_URL = process.env.CDN_BASE_ACCESS_URL;
const CDN_API_KEY = process.env.CDN_API_KEY;

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findOrCreateUser = async (profile: any) => {
  try {
    const user = await prisma.user.upsert({
      where: {
        email: profile["emails"][0].value,
      },
      update: {},
      create: {
        email: profile["emails"][0].value,
        name: profile["displayName"],
        avatar: profile["photos"][0].value,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    return null;
  }
};

export interface User {
  email: string;
  otp: number;
  firstName: string;
  lastName?: string;
}

export const updateUserAvatar = async (userId: string, file: any) => {
  try {
    const fileName = `${userId}-${randomUUID()}-${file.originalname}`;
    const uploadUrl = `${CDN_BASE_UPLOAD_URL}/avatars/${fileName}`;
    const avatarUrl = `${CDN_BASE_ACCESS_URL}/avatars/${fileName}`;

    await axios.put(uploadUrl, file.buffer, {
      headers: {
        AccessKey: CDN_API_KEY,
        "Content-Type": "application/octet-stream",
      },
    });

    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, message: "Failed to update avatar" };
  }
};

export const updateUser = async (
  userId: string,
  updateData: Partial<{
    firstName: string;
    lastName: string;
    email: string;
  }>,
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {...updateData},
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true
      },
    });
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Failed to update user profile" };
  }
};