import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { getUserOrders, type UserOrder, type UserOrderItem } from "../api";
import { useQuery } from "@tanstack/react-query";

export const UserOrderHistory = () => {
  const { data: userOrders } = useQuery<UserOrder[]>({
    queryKey: ["orders"],
    queryFn: getUserOrders,
  });
  if (!userOrders) return;
  return (
    <Stack>
      <Typography variant="h6">Your Orders</Typography>
      <Grid container spacing={2}>
        {userOrders.map((order) => (
          <Grid size={12} key={order.id}>
            <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent sx={{ "&:last-child": { pb: 2 }, p: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Order #{order.id.slice(0, 6)}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={order.status === "Completed" ? "success" : "warning"}
                    size="small"
                  />
                </Box>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant="body1">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    Total: {(order.totalCents / 100).toFixed(2)}
                  </Typography>
                </Stack>
                <List style={{ margin: 0 }}>
                  {order.items.map((item: UserOrderItem) => (
                    <ListItem key={item.id} sx={{ p: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {`$${(item.fruit.priceCents / 100).toFixed(2)} x ${
                          item.qty
                        } ${item.fruit.name}`}{" "}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
