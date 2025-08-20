import { Box, Typography, Grid, IconButton, Paper } from "@mui/material";
import { useCart } from "../context/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddToCartButton } from "../components/AddToCartButton";

export default function Checkout() {
  const { cart, removeItem, clearCart, totalPrice } = useCart();

  // Only show items with qty > 0
  const items = cart.filter((item) => item.qty > 0);

  const removeItemCompletely = (id: string) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      for (let i = 0; i < item.qty; i++) {
        removeItem(id);
      }
    }
  };
  if (items.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">
                  Price: ${(item.priceCents / 100).toFixed(2)} × {item.qty} = $
                  {((item.priceCents / 100) * item.qty).toFixed(2)}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                {/* Reuse CartButton for + / - */}
                <AddToCartButton
                  itemId={item.id}
                  name={item.name}
                  priceCents={item.priceCents}
                />

                {/* Delete icon to remove completely */}
                <IconButton
                  color="error"
                  onClick={() => removeItemCompletely(item.id)}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
