import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import fruitsRouter from "./routes/fruits.ts";
import ordersRouter from "./routes/orders.ts";
import dotenv from "dotenv";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);
dotenv.config();
const app = express();
const isProduction = process.env.NODE_ENV === "production";
app.use(express.json());

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

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: ".onrender.com",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
    (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: any) => void
    ) => {
      // just pass the profile
      done(null, profile);
    }
  )
);
passport.serializeUser((user: any, done: (arg0: null, arg1: any) => any) =>
  done(null, user)
);
passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => any) =>
  done(null, user)
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(
      isProduction
        ? "https://fruit-pos-frontend.onrender.com/"
        : "http://localhost:5173"
    );
    return;
  }
);

app.get("/auth/user", (req, res) => {
  console.log("ENV1: ", process.env.GOOGLE_CLIENT_ID);
  console.log("ENV2: ", process.env.GOOGLE_CLIENT_SECRET);
  console.log("ENV3: ", process.env.SESSION_SECRET);
  console.log("req.user: ", req.user);
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
