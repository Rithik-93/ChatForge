import {
  findOrCreateUser,
  getUserByEmail,
} from "./user";
import { userCreateSchema } from "../schema/types";

export async function authUser(email: string, _: string, done: any) {
  const validateSchema = userCreateSchema.safeParse({ email });
  if (!validateSchema.success) {
    return done(null, false);
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return done(null, false);
  }

  return done(null, {
    id: user.id,
    email: user.email,
    firstname: user.name,
    avatar: user.avatar,
  });
}

export async function googleAuthUser(
  _req: any,
  _accessToken: string,
  _refreshToken: string,
  profile: any,
  done: any,
) {
  const user = await findOrCreateUser(profile);
  if (user) return done(null, user);
  return done(null, false);
}
