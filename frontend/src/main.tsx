import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import App from "./App";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Success from "./pages/Success";
import Manage from "./pages/Manage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <HashRouter>
            <Container disableGutters>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Navigate to="/shop" replace />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/manage" element={<Manage />} />{" "}
                  <Route path="*" element={<Navigate to="/shop" replace />} />
                </Route>
              </Routes>
            </Container>
          </HashRouter>
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
