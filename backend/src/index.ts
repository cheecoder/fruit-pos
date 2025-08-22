import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import fruitsRouter from "./routes/fruits.ts";
import ordersRouter from "./routes/orders.ts";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://fruit-pos-bfoa.onrender.com",
      "https://fruit-pos-frontend.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    },
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
    if (isProduction) {
      res.redirect("https://fruit-pos-frontend.onrender.com/");
      return;
    }
    // Successful login → redirect frontend
    res.redirect("http://localhost:5173");
    return;
  }
);

// Route to get current user info
app.get("/api/me", (req, res) => {
  if (req.user) {
    const user = req.user as any;
    res.json({ name: user.displayName, email: user.emails?.[0].value });
  } else {
    res.json(null);
  }
  return;
});
app.get("/auth/user", (req, res) => {
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
