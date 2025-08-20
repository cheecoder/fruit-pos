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
export default function App() {
  const { cart, addItem, removeItem, totalItems, totalPrice } = useCart();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography>Cheep Fruits</Typography>
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

      <Box sx={{ flex: 1, height: "100dvh", width: "100dvw" }}>
        <Outlet />
      </Box>
      <CheckoutBar />
    </>
  );
}
