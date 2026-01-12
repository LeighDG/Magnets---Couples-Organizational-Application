# Magnet – Couples Organisational Application

## Project Overview

**Magnet** is a couples-focused organisational web application designed to help partners manage their shared life in one central space.
The long-term vision includes shared planning, tasks, finances, and coordination tools built specifically for couples.

The project is currently in **early development / foundation phase**, with a strong focus on **clear architecture, UX-first design, and scalable setup**.

---

## Current Project Status (Important)

⚠️ **This project is in Phase 1: Foundation & Design**

At this stage:

* The codebase is **not feature-complete**
* Several tools are installed and configured, but **no production-ready functionality exists yet**
* Active work is focused on **designing the onboarding and partner-linking experience before implementation**

This is intentional.

---

## Phase 1 Goal

**Enable a user to:**

1. Create an account
2. Log in
3. Link their account with a partner

Nothing beyond this is being built yet.

---

## Tech Stack (Current & Planned)

### Frontend (Client)

* **React** (Vite)
* **React Router** (routing)
* **Tailwind CSS** (utility-first styling)
* Folder structure prepared for:

  * Components
  * Pages
  * Context (global state later)
  * Assets

> Frontend development has not started beyond setup.

---

### Backend (Server)

* **Node.js**
* **Express**
* **Prisma ORM**
* **PostgreSQL** (local development)

> Backend logic is not finalized.
> Database schema is still being designed and iterated.

---

### Database

* PostgreSQL (local)
* Prisma configured
* No production migrations or seeded data yet

---

## Current Folder Structure

```txt
/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
│
├── server/                 # Backend (Node + Express)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── index.js
│   └── prisma.config.ts
│
└── README.md
```

---

## What Is Being Worked On Right Now

* UX design for **Phase 1 onboarding**
* Partner linking flow (invite + accept model)
* Screen definitions for:

  * Welcome
  * Sign up
  * Login
  * Partner linking
  * Invite sent confirmation, invite recieved popup & partner linking success popups.
  * Partner link acceptance (Either notification window or dedicated screen)

Design work is being done **before coding** to avoid rework and confusion.

---

## Use case diagram

<img width="940" height="705" alt="image" src="https://github.com/user-attachments/assets/67a74123-7d5d-4aac-9b66-fee7d0b3cefe" />

This is the current use case diagram for onboarding users.

---
## User Flows for Phase 1

### New User Onboarding Flow
Goal: Allow a new user to create an account and reach the dashboard.
   1. Welcome Screen
   2. Create Account (Sign Up)
   3. Login
   4. Dashboard (No Partner Linked)

### Returning User Flow
Goal: Allow an existing user to access their account.
   1. Welcome Screen
   2. Login
   3. Dashboard (Partner status visible)

### Send Partner Invite Flow
Goal: Allow a user to invite their partner.
   1. Dashboard
   2. Open User Menu (Dropdown)
   3. Select Partner Management
   4. Partner Management Screen (No Partner Linked)
   5. Generate Partner Invite (code or link)
   6. Await Partner Response (Pending State)

📌 Important UX State:
User sees:
* “Invite Sent”
* Invite status: Pending
* Option to cancel / regenerate invite

### Accept Partner Invite Flow
Goal: Allow a user to accept an incoming partner invite.
   1. Dashboard
   2. Open User Menu (Dropdown)
   3. Select Partner Management
   4. Partner Management Screen (Invite Received)
   5. Accept Partner Invite
   6. Dashboard (Partner Linked)

### Unlink Partner Flow
Goal: Allow a user to remove an existing partner.
   1. Dashboard
   2. Open User Menu (Dropdown)
   3. Select Partner Management
   4. Partner Management Screen (Partner Linked)
   5. Remove Partner
   6. Dashboard (No Partner Linked)

⚠️ UX Safeguard:
Confirmation modal (“Are you sure?”)

---

## What Is NOT Done Yet

* No authentication logic
* No partner-linking backend logic
* No API routes
* No deployed environments
* No finalized database schema

---

## Contribution Guidelines (For Now)

* Avoid building features ahead of the design phase
* Keep commits small and descriptive
* Focus on **structure, clarity, and learning**, not speed

---

## Next Planned Steps

1. Finalize Phase 1 UX designs (Figma)
2. Map screens → routes → components
3. Implement onboarding flow frontend
4. Implement basic authentication backend
5. Implement partner linking logic

---

## Project Philosophy

This project prioritizes:

* UX clarity
* Scalable architecture
* Intentional development
* Learning and iteration over rushing features
