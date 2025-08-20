import { Button, Typography, Paper } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { submitOrder, type OrderPayload } from "../api";

export default function CheckoutBar() {
  const { totalItems, totalPrice, clearCart, cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";

  const mutation = useMutation({
    mutationFn: (payload: OrderPayload) => submitOrder(payload),
    onSuccess: () => {
      clearCart();
      navigate("/success");
    },
  });

  if (totalItems === 0) return null;

  const handleClick = () => {
    if (isCheckoutPage) {
      handlePayAndConfirm();
    } else {
      // Go to checkout page
      navigate("/checkout");
    }
  };

  const handlePayAndConfirm = () => {
    const payload: OrderPayload = {
      items: cart.map((item) => ({
        fruitId: item.id,
        qty: item.qty,
        priceCents: item.priceCents,
      })),
    };

    mutation.mutate(payload);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
      elevation={6}
    >
      <Typography variant="subtitle1">
        {totalItems} item{totalItems > 1 ? "s" : ""} - $
        {(totalPrice / 100).toFixed(2)}
      </Typography>

      <Button variant="contained" color="primary" onClick={handleClick}>
        {isCheckoutPage ? "Pay & Confirm" : "Checkout"}
      </Button>
    </Paper>
  );
}
