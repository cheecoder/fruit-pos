import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import ItemCard from "../components/ItemCard";

type Fruit = { id: string; name: string; priceCents: number; stock: number };

export default function Shop() {
  const {
    data: fruits,
    isLoading,
    error,
  } = useQuery<Fruit[]>({
    queryKey: ["fruits"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/fruits");
      return res.data;
    },
  });

  if (isLoading) return <Typography>Loading fruits...</Typography>;
  if (error) return <Typography>Error loading fruits</Typography>;
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {fruits?.map((fruit) => (
        <Grid item xs={12} sm={6} key={fruit.id}>
          <ItemCard
            name={fruit.name}
            priceCents={fruit.priceCents}
            stock={fruit.stock}
          />
        </Grid>
      ))}
    </Grid>
  );
}
