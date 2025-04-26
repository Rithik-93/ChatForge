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
    origin: ["*"],
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

app.use("/api/core", router);

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

app.get('/logout', (req, res) => {
    req.logout((error) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong' })
        }

        res.status(204).send()
    })
})

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
