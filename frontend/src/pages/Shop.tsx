import { Grid, Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import ItemCard from "../components/ItemCard";
import { getFruits } from "../api";

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

  if (isLoading) return <Typography>Loading fruits...</Typography>;
  if (error) return <Typography>Error loading fruits</Typography>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Available Fruits
      </Typography>
      <Grid
        container
        spacing={2}
        flexGrow={1}
        alignContent={"center"}
        alignItems={"center"}
      >
        {fruits?.map((fruit) => (
          <Grid item xs={12} sm={6} key={fruit.id}>
            <ItemCard fruit={fruit} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
