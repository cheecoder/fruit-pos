import { Button, Card, CardContent, Typography } from "@mui/material";
import { AddToCartButton } from "./AddToCartButton";

type BaseItem = {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
};

type ItemCardProps = {
  fruit: BaseItem;
};

export default function ItemCard({ fruit }: ItemCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{fruit.name}</Typography>
        <Typography>Price: ${(fruit.priceCents / 100).toFixed(2)}</Typography>
        <Typography>Stock: {fruit.stock}</Typography>
        <AddToCartButton
          itemId={fruit.id}
          name={fruit.name}
          priceCents={fruit.priceCents}
        />
      </CardContent>
    </Card>
  );
}
