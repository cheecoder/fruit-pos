import axios from "axios";
import api from "./axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// =======================
// Types
// =======================

export type Fruit = {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
};

export type OrderItem = {
  fruitId: string;
  qty: number;
  priceCents: number;
};

export type OrderPayload = {
  items: OrderItem[];
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  status: "Pending" | "Completed";
  totalCents: number;
};

export type UpdateOrderPayload = {
  id: string;
  status: "Pending" | "Completed";
};

// =======================
// API Calls
// =======================

// Get all fruits
export const getFruits = async (): Promise<Fruit[]> => {
  const response = await api.get(`${API_BASE}/fruits`);
  return response.data;
};

// Submit a customer order (checkout)
export const submitOrder = async (payload: OrderPayload): Promise<Order> => {
  const response = await api.post(`${API_BASE}/orders`, payload);
  return response.data;
};

// Get all orders (for store owner)
export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get(`${API_BASE}/orders`);
  return response.data;
};

// Update order status (for store owner)
export const updateOrderStatus = async (payload: UpdateOrderPayload) => {
  const { data } = await api.patch(`${API_BASE}/orders/status`, payload);
  return data;
};
