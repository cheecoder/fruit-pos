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
| 5  | As an **owner**, I want to see the total sales for each day and for each fruit, so that I can track the performance of my store.                       | 🟠 Medium | Important for analytics, but not blocking the sales flow.                 |
| 6  | As an **owner**, I want to be able to add new fruits and amend my stock levels, so that I can keep my online store up to date.                         | 🟠 Medium | Core to store management, but can be added after basic ordering is live.  |
| 7  | As a **customer**, I want to be able to log in and see my order history, so that I can track my previous purchases.                                    | 🟠 Medium | Enhances user experience; useful for retention, but not critical for MVP. |
| 8  | As a **customer**, I want to be able to re-order a previous order, so that I can quickly purchase the same items again.                                | 🟡 Low    | Convenience feature, depends on order history being available.            |
| 9  | As a **customer**, I want to know how many people are currently considering buying a fruit, so that I can make a quick decision before stock runs out. | 🟡 Low    | Adds urgency (nice-to-have), but not essential for basic shopping.        |
| 10 | As a **customer**, I want to be able to ask the store owner common questions about a fruit, so that I can make an informed decision.                   | 🟡 Low    | Improves engagement, but chat/FAQ features can be delayed.                |
| 11 | As a **customer**, I want to be able to use the app on my phone so I can shop on the go.                                                               | 🟠 Medium | Responsiveness is expected today, but can be handled after desktop flow.  |
| 12 | As a **customer**, I want my order shortlist to be saved so that I can continue shopping on my device later, even if I have not logged in.             | 🟡 Low    | Convenience for guest users, but persistence without login is secondary.  |
| 13 | As a **customer**, after logging in, I want my order shortlist to be saved so that I can log in and continue shopping on another device later.         | 🟠 Medium | Useful for multi-device shoppers; higher priority than guest persistence. |
| 14 | As an **owner**, I want to be able to serve millions of customers at the same time, so that I can scale my business.                                   | 🟡 Low    | Scalability is long-term; MVP can start with smaller scale.               |
| 15 | As an **owner**, I do not want my customers to see the store’s order history or amend stocks, so that sensitive actions remain restricted to me.       | 🟠 Medium | Security and access control are essential once multiple roles exist.      |
| 16 | As an **owner**, I want my customers’ order submissions to be encrypted, so they cannot be intercepted by competitors.                                 | 🟠 Medium | Security is critical; should be included before going live.               |
| 17 | As a **customer**, I want the fruit store pages to load quickly at all times, so that I can browse and shop without delays.                            | 🟠 Medium | Performance impacts user satisfaction; not blocking MVP, but important.   |


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



