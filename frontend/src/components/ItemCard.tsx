import { Button, Card, CardContent, Typography } from "@mui/material";

type ItemCardProps = {
  name: string;
  priceCents: number;
  stock: number;
};

export default function ItemCard({ name, priceCents, stock }: ItemCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography>Price: ${(priceCents / 100).toFixed(2)}</Typography>
        <Typography>Stock: {stock}</Typography>
        <Button variant="contained" sx={{ mt: 1 }}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
