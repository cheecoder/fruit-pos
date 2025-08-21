// src/pages/Manage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrders,
  updateOrderStatus,
  type Order,
  type UpdateOrderPayload,
} from "../api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Manage = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState(0); // 0 = Pending, 1 = Completed

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const mutation = useMutation({
    mutationFn: (payload: UpdateOrderPayload) => updateOrderStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleComplete = (id: string) => {
    mutation.mutate({ id, status: "Completed" });
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const filteredOrders = orders.filter((o) =>
    tab === 0 ? o.status === "Pending" : o.status === "Completed"
  );
  if (isLoading) return <Typography>Loading orders...</Typography>;
  if (error) return <Typography>Error loading orders</Typography>;
  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Manage Orders
      </Typography>

      {/* Tabs */}
      <Tabs value={tab} onChange={handleTabChange} aria-label="order tabs">
        <Tab label="Pending Orders" />
        <Tab label="Completed Orders" />
      </Tabs>

      <Box mt={2}>
        {filteredOrders.length === 0 && (
          <Typography>No orders in this tab.</Typography>
        )}

        {filteredOrders.map((order) => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Typography>
                Total: ${(order.totalCents / 100).toFixed(2)}
              </Typography>
              <Typography>
                Created At: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <List>
                {order.items.map((item: any) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`${item.qty} x ${item.fruit.name}`}
                      secondary={`$${(item.unitPriceCents / 100).toFixed(
                        2
                      )} each`}
                    />
                  </ListItem>
                ))}
              </List>
              {tab === 0 && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleComplete(order.id)}
                >
                  Complete
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Manage;
