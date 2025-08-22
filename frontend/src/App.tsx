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
  const { user } = useAuth();

  useEffect(() => {
    console.log("User in App: ", user);
  }, [user]);

  return (
    <>
      <AppBar position="static" sx={{ width: "100dvw" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: "1rem" }}>
          <Typography>Chee-per Fruits</Typography>
          {user ? user.name.givenName : <LoginButton />}
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
