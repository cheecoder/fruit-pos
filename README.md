# Fruits POS Application

## Overview

This is a full-stack Point of Sale (POS) web application for an online fruits store.  
It has two user personas: **Customer** and **Store Owner**.

- **Frontend:** React + Vite + MUI + React Query
- **Backend:** Node.js + TypeScript + Express + Prisma + SQLite

---

## User Stories & Progress

| # | User Story                                                                                                                          | Status         | Priority  |
| - | ----------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------- |
| 1 | As a **customer**, I want to see a list of fruits (with stock and price) so that I can decide what to buy.                          | ✅ Completed    | 🔴 High   |
| 2 | As a **customer**, I want to track fruits & quantities in my cart (with total cost), so that I can adjust my purchase.              | ✅ In Progress | 🔴 High   |
| 3 | As a **customer**, I want to submit my fruit order so that I can complete my purchase. (Payment is assumed to be outside this app.) | ✅ In Progress | 🔴 High   |
| 4 | As an **owner**, I want to see submitted customer orders so that I can fulfill them.                                                | ✅ Pending      | 🔴 High  |


**Progress Key:**

✅ Completed
🟡 In Progress
⬜ Pending

---

## Project Structure
pos-fruits/
├─ backend/                     # Node.js + Express + Prisma + SQLite
│  ├─ src/
│  │  └─ index.ts
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ seed.ts
│  ├─ package.json
│  └─ tsconfig.json
│
├─ frontend/                    # React + Vite + MUI + React Query
│  ├─ src/
│  │  ├─ pages/
│  │  │  ├─ Shop.tsx
│  │  │  ├─ Success.tsx
│  │  │  ├─ Checkout.tsx
│  │  │  └─ Manage.tsx
│  │  ├─ context/
│  │  │  └─ CartContext.tsx
│  │  └─ App.tsx
│  ├─ package.json
│  └─ tsconfig.json
│
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

## Pages
| URL         | Description                                        |
| ----------- | -------------------------------------------------- |
| `/`         | Customer view of all available fruits              |
| `/checkout` | Customer checkout page with cart                   |
| `/success`  | Confirmation page after successful checkout        |
| `/manage`   | Owner’s dashboard to view & manage customer orders |



```
