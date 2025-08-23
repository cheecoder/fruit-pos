import { Grid, Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import ItemCard from "../components/ItemCard";
import { getFruits } from "../api";
import { useAuth } from "../context/AuthContext";
import AddFruitDialog from "../components/AddFruitDialog";

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

  if (isLoading) return <Typography>Loading fruits...</Typography>;
  if (error) return <Typography>Error loading fruits</Typography>;

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={"row"}
        alignItems={"center"}
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Available Fruits</Typography>
        {<AddFruitDialog isAuthenticated={Boolean(user)} />}
      </Box>
      <Grid
        container
        spacing={2}
        flexGrow={1}
        alignContent={"center"}
        alignItems={"center"}
      >
        {fruits?.map((fruit) => (
          <Grid size={6} key={fruit.id}>
            <ItemCard fruit={fruit} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
