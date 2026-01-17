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

## Entity Relationship Diagram for partner linking

<img width="1166" height="647" alt="image" src="https://github.com/user-attachments/assets/b7e48081-3dce-4c08-b7d4-1e162628f790" />

---

## How partner linking works (flow)
A) User generates an invite link/code
1. Check inviter is not already in an ACTIVE relationship (or decide your rules).
2. Create a Relationship.
3. Create RelationshipMember for inviter.
4. Create PartnerInvite with tokenHash, status=PENDING, expiresAt (e.g., 24h).
5. Return the raw token to the client (only once), like:
   - link: /partner-link?token=RAW_TOKEN
   - or 6-digit code (mapped to token internally)

B) Partner accepts invite
1. Partner submits token.
2. Server hashes token and finds PartnerInvite where:
3. tokenHash matches
4. status = PENDING
5. expiresAt > now
6. Check relationship currently has < 2 members.
7. Create RelationshipMember for the accepting user.
8. Mark invite ACCEPTED, set acceptedAt.
9. Relationship becomes ACTIVE (if you want a status flip when 2 members exist)

That’s it. Now both users share the same relationshipId.

### How “syncing shared features” works
Every shared record belongs to the relationship, not a user.

### Permissions model (simple and safe)
A user can access data only if they are a RelationshipMember of that relationship.
For any API request involving relationship data, enforce:
- decode JWT → userId
- look up user’s relationshipId via RelationshipMember
- only allow CRUD on rows with that relationshipId
This prevents cross-relationship access even if someone guesses IDs.

### What about “unlinked” users?
They just don’t have a RelationshipMember record yet.
Their personal features can either be disabled, or stored as “personal” records tied to userId.
If you want pre-link usage: you can support personal mode now and migrate later by copying or by letting tasks be either userId or relationshipId. But if MVP is couples-first, keep it simple: relationship is required for shared features.

### Recommended constraints/rules (MVP-friendly)
- One active relationship per user (enforced in app logic)
- One pending invite at a time per relationship
- Invites expire
- Token is stored hashed
- Accepting user can’t be the inviter

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
