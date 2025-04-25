import express from "express";
import cors from "cors";
import { login, register } from "./controllers/auth.controller";
import router from "./controllers/chat.controller";
import cookieParser from "cookie-parser";
import helmet from "helmet";

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

app.post("/api/signup", register);
app.post("/api/login", login);

app.use("/api/core", router);

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
