import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        🎉 Order Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Thank you for your purchase.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Shop
      </Button>
    </Box>
  );
};
