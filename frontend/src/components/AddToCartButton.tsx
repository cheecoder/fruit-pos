import { Button, Box, Typography, IconButton } from "@mui/material";
import { useCart } from "../context/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type CartButtonProps = {
  itemId: string;
  name: string;
  priceCents: number;
  maxQty: number;
};

export function AddToCartButton({
  itemId,
  name,
  priceCents,
  maxQty,
}: CartButtonProps) {
  const { cart, addItem, removeItem } = useCart();

  // Find the quantity of this item in cart
  const cartItem = cart.find((i) => i.id === itemId);
  const qty = cartItem?.qty || 0;

  if (qty === 0) {
    // Show "Add to Cart"
    return (
      <Button
        size="small"
        variant="contained"
        disabled={maxQty <= 0}
        onClick={() => addItem({ id: itemId, name, priceCents, qty: 1 })}
      >
        {maxQty <= 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    );
  }

  // Show (- qty +) interface
  return (
    <Box display="flex" alignItems="center">
      <IconButton size="small" onClick={() => removeItem(itemId)}>
        <RemoveIcon />
      </IconButton>

      <Typography sx={{ mx: 1 }}>{qty}</Typography>

      {qty < maxQty && (
        <IconButton
          size="small"
          onClick={() => addItem({ id: itemId, name, priceCents, qty: 1 })}
        >
          <AddIcon />
        </IconButton>
      )}
    </Box>
  );
}
