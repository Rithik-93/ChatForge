import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../prisma/src";
import local from "passport-local";
import { authUser } from "../utils/auth";
import { getUserById } from "../utils/user";
import { clientID, clientSecret } from "../config/config";


export const callbackURL = `http://localhost:3000/api/auth/google/callback`;

passport.use(
    new local.Strategy(
      { usernameField: "email", passwordField: "password" },
      authUser
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: callbackURL,
        passReqToCallback: true,
        scope: ["profile", "email"],
      },
      googleAuthUser
    )
  );
  passport.serializeUser((user: any, done: any) => {
    process.nextTick(function () {
      done(null, user.id);
    });
  });
  
  passport.deserializeUser((id: any, done: any) => {
    process.nextTick(async function () {
      try {
        const user = await getUserById(id);
        if (!user) {
          throw new Error("User not Found");
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    });
  });

export default passport;

async function googleAuthUser(
  _req: any,
  _accessToken: string,
  _refreshToken: string,
  profile: any,
  done: any,
) {
  try {
    console.log("Google profile:", JSON.stringify(profile, null, 2));
    
    const user = await findOrCreateUser(profile);
    if (user) return done(null, user);
    
    console.error("Failed to create or find user from Google profile");
    return done(null, false);
  } catch (error) {
    console.error("Error in Google authentication:", error);
    return done(error);
  }
}

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
          avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
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