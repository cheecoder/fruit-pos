import express from "express";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import fruitsRouter from "./routes/fruits.ts";
import ordersRouter from "./routes/orders.ts";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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
    (accessToken: any, refreshToken: any, profile: any, done) => {
      done(null, profile);
    }
  )
);
app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  (req, res) => {
    console.log("/auth/google: ", req.headers);
  }
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    console.log("/auth/google/callback: ", req.headers);
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
    res.redirect(redirectUrl);

    return;
  }
);

app.get("/auth/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
  return;
});

app.use("/api/fruits", fruitsRouter);
app.use("/api/orders", ordersRouter);

const PORT = process.env.PORT || 3000;

app.listen(3000, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
