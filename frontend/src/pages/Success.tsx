import { Typography, Button, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import type { Order } from "../api";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order: Order = location.state?.order;
  return (
    <Stack alignItems={"center"} justifyContent={"center"} gap={"1rem"}>
      <Typography variant="h4" gutterBottom>
        Order Confirmed!
      </Typography>
      <Stack>
        <Typography>Order tracking number: </Typography>
        <Typography>${order.id}</Typography>
      </Stack>
      <Typography variant="body1">
        Thank you for your purchase. Please wait for your order to be fulfilled
        by an Owner.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/shop")}>
        Back to Shop
      </Button>
    </Stack>
  );
};

export default Success;
