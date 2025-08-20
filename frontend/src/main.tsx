import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import App from "./App";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Shop />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
