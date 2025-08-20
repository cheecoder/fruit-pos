# Fruits POS Application

## Overview

This is a full-stack Point of Sale (POS) web application for an online fruits store.  
It has two user personas: **Customer** and **Store Owner**.

- **Frontend:** React + Vite + MUI + React Query
- **Backend:** Node.js + TypeScript + Express + Prisma + SQLite

---

## User Stories & Progress

| #   | User Story                                                                                                                                                                                         | Status      | Priority | Notes                                                                                     | Progress |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- | ----------------------------------------------------------------------------------------- | -------- |
| 1   | **As a customer, I want to see a list of fruits that are available to buy (complete with stock and pricing information), so that I can decide which fruits I want to buy.**                        | Completed   | High     | Uses React Query to fetch fruits and MUI Cards to display in 2×N grid.                    | ☑️       |
| 2   | **As a customer, I want to keep track of the fruits and quantity that I have shortlisted (including the total amount I need to pay), so that I can adjust my purchasing decisions as I shop.**     | In Progress | High     | Cart implemented with React Context; AppBar shows total quantity.                         | 🔲       |
| 3   | **As a customer, I want to submit my order of the fruits I selected, so that I can complete my purchase when I am done shopping. Assume that payment is done separate from this POS application.** | In Progress | High     | Checkout page displays cart and submits order to backend using React Query `useMutation`. | 🔲       |
| 4   | **As an owner, I want to see the orders that my customers have submitted, so that I can fulfill their orders.**                                                                                    | Pending     | Medium   | Orders page lists all submitted orders; backend exposes `GET /api/orders`.                | ⬜       |

**Progress Key:**

- ☑️ Completed
- 🔲 In Progress
- ⬜ Pending

---

## Project Structure

pos-fruits/
├─ backend/ # Node.js + Express + Prisma + SQLite
│ ├─ src/
│ │ └─ index.ts
│ ├─ prisma/
│ │ ├─ schema.prisma
│ │ └─ seed.ts
│ ├─ package.json
│ └─ tsconfig.json
├─ frontend/ # React + Vite + MUI + React Query
│ ├─ src/
│ │ ├─ pages/
│ │ │ ├─ Shop.tsx
│ │ │ └─ Checkout.tsx
│ │ ├─ context/
│ │ │ └─ CartContext.tsx
│ │ └─ App.tsx
│ ├─ package.json
│ └─ tsconfig.json
└─ README.md

---

## Installation & Running

### Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init   # create DB
npx prisma db seed                  # populate initial fruits
npm run start                       # start backend on http://localhost:3000

### Frontend
cd frontend
npm install
npm run dev                         # start frontend on http://localhost:5173 (default)

## API Endpoints
| Method | Endpoint      | Description               |
| ------ | ------------- | ------------------------- |
| GET    | /api/fruits   | List all available fruits |
| GET    | /api/orders   | List all submitted orders |
| POST   | /api/checkout | Submit a customer order   |


```
