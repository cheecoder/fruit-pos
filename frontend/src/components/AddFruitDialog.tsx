import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  Stack,
  FilledInput,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFruit, type CreateFruitPayload } from "../api";

type AddFruitDialogProps = {
  onAdded?: () => void;
  isAuthenticated: boolean;
};

export default function AddFruitDialog({
  onAdded,
  isAuthenticated,
}: AddFruitDialogProps) {
  const [open, setOpen] = useState(false);
  const [fruitName, setFruitName] = useState("");
  const [stock, setStock] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const queryClient = useQueryClient();
  const createFruitMutation = useMutation({
    mutationFn: (payload: CreateFruitPayload) => createFruit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fruits"] });
    },
  });
  const handleSubmit = async () => {
    try {
      setOpen(false);
      setFruitName("");
      setStock("");
      setPrice("");
      createFruitMutation.mutate({
        name: fruitName,
        stock: parseInt(stock, 10),
        price: parseFloat(price),
      });
    } catch (err) {
      console.error("Failed to add fruit", err);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Fruit</DialogTitle>
        <DialogContent>
          <Stack gap={"0.25rem"}>
            <TextField
              variant="filled"
              label="Fruit Name"
              value={fruitName}
              onChange={(e) => setFruitName(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              variant="filled"
              label="Initial Stock"
              value={stock}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setStock(val);
                }
              }}
              margin="normal"
              fullWidth
              required
            />
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || !isNaN(Number(val))) setPrice(val);
                }}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
