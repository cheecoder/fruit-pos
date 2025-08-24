import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import ItemCard from "../components/ItemCard";
import {
  getFruits,
  getUserOrders,
  type Order,
  type UserOrder,
  type UserOrderItem,
} from "../api";
import { useAuth } from "../context/AuthContext";
import AddFruitDialog from "../components/AddFruitDialog";
import { useCart } from "../context/CartContext";
import { UserOrderHistory } from "../components/UserOrderHistory";

type Fruit = { id: string; name: string; priceCents: number; stock: number };

export default function Shop() {
  const {
    data: fruits,
    isLoading,
    error,
  } = useQuery<Fruit[]>({
    queryKey: ["fruits"],
    queryFn: getFruits,
  });

  const { user } = useAuth();
  const { cart } = useCart();

  if (isLoading) return <Typography>Loading fruits...</Typography>;
  if (error) return <Typography>Error loading fruits</Typography>;

  return (
    <Stack gap={"1rem"}>
      <Stack>
        <Box display="flex" flexDirection={"row"} alignItems={"center"}>
          <Typography variant="h6">Available Fruits</Typography>
          {<AddFruitDialog isAuthenticated={Boolean(user)} />}
        </Box>
        <Grid
          container
          spacing={2}
          flexGrow={1}
          alignContent={"center"}
          alignItems={"center"}
          sx={{ pb: cart.length > 0 ? "5rem" : 0 }}
        >
          {fruits?.map((fruit) => (
            <Grid size={6} key={fruit.id}>
              <ItemCard fruit={fruit} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      {user && <UserOrderHistory />}
    </Stack>
  );
}
