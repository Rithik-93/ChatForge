/* eslint-disable no-unused-vars */
import { Store, SessionData } from "express-session";
import prisma from "../prisma/src";

export class PrismaSessionStore extends Store {
  constructor() {
    super();
  }

  async get(
    sid: string,
    callback: (err: any, session?: SessionData | null) => void,
  ) {
    try {
      const session = await prisma.session.findUnique({
        where: { sid },
      });

      if (!session) {
        return callback(null, null);
      }

      if (session.expires < new Date()) {
        await this.destroy(sid);
        return callback(null, null);
      }

      const sessionData = JSON.parse(session.data) as SessionData;
      callback(null, sessionData);
    } catch (err) {
      console.error("Error retrieving session", err);
      callback(err);
    }
  }

  async set(sid: string, session: SessionData, callback?: (err?: any) => void) {
    //@ts-ignore
    if (!session.passport) {
      callback?.(null);
      return;
    }
    //@ts-ignore
    const userId = session.passport["user"];
    if (!userId) {
      console.error("No userId found in session data");
      callback?.(null);
      return;
    }

    try {
      const ttl = session.cookie?.maxAge || 24 * 60 * 60 * 1000;
      const expires = new Date(Date.now() + ttl);

      await prisma.session.upsert({
        where: { sid },
        update: {
          data: JSON.stringify(session),
          expires,
        },
        create: {
          sid,
          data: JSON.stringify(session),
          expires,
          userId,
        },
      });

      callback?.();
    } catch (err) {
      console.error("Error saving session", err);
      callback?.(err);
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void) {
    try {
      const result = await prisma.session.deleteMany({
        where: { sid },
      });
      callback?.();
    } catch (err) {
      console.error("Error deleting session", err);
      callback?.(err);
    }
  }

  async touch(
    sid: string,
    session: SessionData,
    callback?: (err?: any) => void,
  ) {
    try {
      const ttl = session.cookie?.maxAge || 24 * 60 * 60 * 1000;
      const expires = new Date(Date.now() + ttl);

      await prisma.session.update({
        where: { sid },
        data: { expires },
      });

      callback?.();
    } catch (err) {
      console.error("Error touching session", err);
      callback?.(err);
    }
  }
}