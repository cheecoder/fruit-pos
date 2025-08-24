import express from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import fruitsRouter from "./routes/fruits.ts";
import ordersRouter from "./routes/orders.ts";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { logger } from "./utils/logger.ts";
import { prisma } from "./utils/db.ts";

dotenv.config();
const app = express();
app.use(express.json());

const isProduction = process.env.NODE_ENV === "production";
app.use(
  cors({
    origin: [
      "https://fruit-pos-frontend.onrender.com",
      "https://fruit-pos-bfoa.onrender.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: isProduction
        ? "https://fruit-pos-bfoa.onrender.com/auth/google/callback"
        : "http://localhost:3000/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done) => {
      try {
        const email = profile.emails?.[0].value!;
        const name = profile.displayName;
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: { email, name },
        });
        logger.info({ user }, "Login from user detected");

        return done(null, profile);
      } catch (err) {
        logger.error({ err }, "Error in Google Strategy");
        return done(err);
      }
    }
  )
);
app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.displayName,
        email: req.user.emails?.[0].value,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    const redirectUrl = isProduction
      ? `https://fruit-pos-frontend.onrender.com/?token=${token}`
      : `http://localhost:5173/?token=${token}`;
    return res.redirect(redirectUrl);
  }
);

app.use("/api/fruits", fruitsRouter);
app.use("/api/orders", ordersRouter);

const PORT = process.env.PORT || 3000;

app.listen(3000, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
