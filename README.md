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
| 1 | As a **customer**, I want to see a list of fruits (with stock and price) so that I can decide what to buy.                          | ✅ Completed   | 🔴 High  |
| 2 | As a **customer**, I want to track fruits & quantities in my cart (with total cost), so that I can adjust my purchase.              | ✅ Completed   | 🔴 High  |
| 3 | As a **customer**, I want to submit my fruit order so that I can complete my purchase. (Payment is assumed to be outside this app.) | ✅ Completed   | 🔴 High  |
| 4 | As an **owner**, I want to see submitted customer orders so that I can fulfill them.                                                | ✅ Completed   | 🔴 High  |
| 5  | As an **owner**, I want to see the total sales for each day and for each fruit, so that I can track the performance of my store.                       | ⬜ Pending | 🟠 Medium   |
| 6  | As an **owner**, I want to be able to add new fruits and amend my stock levels, so that I can keep my online store up to date.                         | ⬜ Pending | 🟠 Medium   |
| 7  | As a **customer**, I want to be able to log in and see my order history, so that I can track my previous purchases.                                    | ⬜ Pending | 🟠 Medium   |
| 8  | As a **customer**, I want to be able to re-order a previous order, so that I can quickly purchase the same items again.                                | ⬜ Pending | 🟡 Low      |
| 9  | As a **customer**, I want to know how many people are currently considering buying a fruit, so that I can make a quick decision before stock runs out. | ⬜ Pending | 🟡 Low      |
| 10 | As a **customer**, I want to be able to ask the store owner common questions about a fruit, so that I can make an informed decision.                   | ⬜ Pending | 🟡 Low      |
| 11 | As a **customer**, I want to be able to use the app on my phone so I can shop on the go.                                                               | ⬜ Pending | 🟠 Medium   |
| 12 | As a **customer**, I want my order shortlist to be saved so that I can continue shopping on my device later, even if I have not logged in.             | ⬜ Pending | 🟡 Low      |
| 13 | As a **customer**, after logging in, I want my order shortlist to be saved so that I can log in and continue shopping on another device later.         | ⬜ Pending | 🟠 Medium   |
| 14 | As an **owner**, I want to be able to serve millions of customers at the same time, so that I can scale my business.                                   | ⬜ Pending | 🟡 Low      |
| 15 | As an **owner**, I do not want my customers to see the store’s order history or amend stocks, so that sensitive actions remain restricted to me.       | ⬜ Pending | 🟠 Medium   |
| 16 | As an **owner**, I want my customers’ order submissions to be encrypted, so they cannot be intercepted by competitors.                                 | ⬜ Pending | 🟠 Medium   |
| 17 | As a **customer**, I want the fruit store pages to load quickly at all times, so that I can browse and shop without delays.                            | ⬜ Pending | 🟠 Medium   |

**Progress Key:**

✅ Completed
🟡 In Progress
⬜ Pending

## Installation & Running

### Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init   # create DB
npx prisma db seed                  # populate initial fruits
npm run start                       # start backend on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev                         # start frontend on http://localhost:5173 (default)
```

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

## Technical Improvements
| Item         | Description                                        |
| ----------- | -------------------------------------------------- |
| Seed Data   | Improve seeding with orders, users, additional fruits             |
| Authentication & Authorization | Add JWT or session-based auth so not everyone can modify stock/orders               |
| Further Organize Code  |Split routes, controllers, services, and database logic into separate folders.        |
| Validation Layer  | use `zod` to validate incoming request bodies |
| Error Handling Middleware | Add a global error handler in Express to handle validation errors, DB errors etc | 
| Rate limiting | On sensitive endpoints to prevent abuse | 


