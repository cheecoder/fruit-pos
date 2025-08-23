import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import IconWithBadge from "./components/IconWithBadge";
import { useCart } from "./context/CartContext";
import HomeIcon from "@mui/icons-material/Home";
import CheckoutBar from "./components/CheckoutBar";
import LoginButton from "./components/LoginButton";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";
export default function App() {
  const { cart, addItem, removeItem, totalItems, totalPrice } = useCart();
  const { user, setToken, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ name: payload.name, email: payload.email });
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/shop");
  };

  return (
    <>
      <AppBar position="static" sx={{ width: "100dvw" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: "1rem" }}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>{user ? `Welcome ${user.name}` : "Welcome"}</Typography>
            {user && (
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            )}
          </Stack>
          {!user && <LoginButton />}
          <Box>
            <IconButton color="inherit" component={RouterLink} to="/">
              <HomeIcon />
            </IconButton>
            {user && (
              <IconButton color="inherit" component={RouterLink} to="/manage">
                <LocalShippingIcon />
              </IconButton>
            )}
            <IconButton color="inherit" component={RouterLink} to="/checkout">
              <IconWithBadge count={totalItems} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, height: "100dvh", p: "1rem" }}>
        <Outlet />
      </Box>
      <CheckoutBar />
    </>
  );
}
