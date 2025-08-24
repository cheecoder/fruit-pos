import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
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
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Stack>
          <Stack>
            <Typography variant="h6">{fruit.name}</Typography>
            <Typography>
              Price: ${(fruit.priceCents / 100).toFixed(2)}
            </Typography>
            <Typography>Stock: {fruit.stock < 0 ? 0 : fruit.stock}</Typography>
          </Stack>

          <AddToCartButton
            itemId={fruit.id}
            name={fruit.name}
            priceCents={fruit.priceCents}
            maxQty={fruit.stock}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
