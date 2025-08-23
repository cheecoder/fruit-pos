import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;
type IconWithBadgeProps = { count: number };
export default function IconWithBadge({ count }: IconWithBadgeProps) {
  return (
    <IconButton>
      <ShoppingCartIcon sx={{ color: "white" }} />
      <CartBadge badgeContent={count} color="secondary" overlap="circular" />
    </IconButton>
  );
}
