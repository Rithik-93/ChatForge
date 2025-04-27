import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { login, register } from "./controllers/auth.controller";
import router from "./controllers/chat.controller";
import cookieParser from "cookie-parser";
import session from 'express-session';
import helmet from "helmet";
import passport from './services/passport'
import { PrismaSessionStore } from "./services/session";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(helmet());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  session({
    secret: 'AUTH_SECRET',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.post("/api/signup", register);
app.post("/api/login", login);

app.use("/api/core", isLoggedIn, router);

app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    successRedirect: `http://localhost:5173/dashboard`,
  }),
);

app.post("/logout", (req: Request, res: Response) => {
  req.logout(() => {
    res.clearCookie("user");
    res.clearCookie("connect.sid");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
});

app.get("/api/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
    return
  } else {
    res.status(401).json({ authenticated: false });
    return
  }
});

export function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
  if (!req.isAuthenticated()) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
}

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
