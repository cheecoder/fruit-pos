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

export type UserOrderItem = {
  id: string;
  orderId: string;
  fruitId: string;
  qty: number;
  unitPriceCents: number;
  fruit: Fruit;
};

export type UserOrder = {
  id: string;
  createdAt: string;
  totalCents: number;
  status: "Pending" | "Completed";
  userId: string;
  items: UserOrderItem[];
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

export type CreateFruitPayload = {
  name: string;
  stock: number;
  price: number;
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

export const getUserOrders = async (): Promise<UserOrder[]> => {
  const response = await api.get(`${API_BASE}/orders/me`);
  return response.data;
};

// Update order status (for store owner)
export const updateOrderStatus = async (payload: UpdateOrderPayload) => {
  const { data } = await api.patch(`${API_BASE}/orders/status`, payload);
  return data;
};

export const createFruit = async (payload: CreateFruitPayload) => {
  const { data } = await api.post(`${API_BASE}/fruits`, payload);
  return data;
};
