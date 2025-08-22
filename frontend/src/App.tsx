import { Outlet, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import IconWithBadge from "./components/IconWithBadge";
import { useCart } from "./context/CartContext";
import HomeIcon from "@mui/icons-material/Home";
import CheckoutBar from "./components/CheckoutBar";
import LoginButton from "./components/LoginButton";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
export default function App() {
  const { cart, addItem, removeItem, totalItems, totalPrice } = useCart();
  const { user, setToken, setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(payload);
      setUser({ name: payload.name, email: payload.email });
      // remove token from URL after reading it
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ width: "100dvw" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: "1rem" }}>
          <Typography>Chee-per Fruits</Typography>
          {user ? user.name : <LoginButton />}
          <Box>
            <IconButton color="inherit" component={RouterLink} to="/">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" component={RouterLink} to="/checkout">
              <IconWithBadge count={totalItems} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box sx={{ flexGrow: 1, height: "100dvh", p: "1rem" }}>
        <Outlet />
      </Box>
      <CheckoutBar />
    </>
  );
}
