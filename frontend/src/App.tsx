import { Outlet, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/">
            Shop
          </Button>
          <Button color="inherit" component={RouterLink} to="/checkout">
            Checkout
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
