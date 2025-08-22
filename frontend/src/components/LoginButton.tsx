import { Button } from "@mui/material";

export default function LoginButton() {
  const backendUrl =
    import.meta.env.MODE === "production"
      ? "https://fruit-pos-bfoa.onrender.com"
      : "http://localhost:3000";

  const handleLogin = () => {
    // This will redirect the browser to Google OAuth flow
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <Button sx={{ color: "white" }} onClick={handleLogin}>
      Sign in
    </Button>
  );
}
