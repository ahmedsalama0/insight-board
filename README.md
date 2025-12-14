# InsightBoard – Frontend Engineering Challenge

InsightBoard demonstrates modern frontend engineering practices using **Next.js App Router**, **TypeScript**, **TanStack Query**, and **Material UI**, with a focus on clean architecture, server-state management, and scalability.

---

## 🧭 Overview

InsightBoard is a productivity application that includes:

- A **tasks feature similar to Trello**, using a Kanban-style board
- A **notes feature similar to Evernote**, supporting autosave via debounced mutations

The goal of the project is to showcase frontend architecture, state management, and interaction with a mock backend.

---

## 🚀 Tech Stack

- Next.js (App Router)

- TypeScript

- TanStack Query (React Query)

- Material UI (MUI)

- React Hook Form + Zod

- JSON Server (Mock API)

- Client-side Authentication (Mocked)

---

## 📦 Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Configure environment constants

Update the following file:

📁 `app/global/constants.ts`

Replace:

- `API_KEY`
- `BASE_URL`

with your own values.

---

### 3️⃣ Run the JSON Server (Mock Backend)

```bash
npm run serve-json
```

This starts a mock REST API for:

- Tasks
- Notes

---

### 4️⃣ Run the Next.js development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## ✨ Features

### 🔐 Authentication

- Email and password login
- Fake authentication using a mock API
- Token stored in `localStorage`
- Client-side protected routes using route guards

---

### ✅ Tasks Module

- Full CRUD operations (Create, Read, Update, Delete)
- Kanban-style board with columns:

  - Todo
  - In Progress
  - Done

- Optimistic updates implemented using **TanStack Query**
- Proper handling of:

  - Loading states
  - Empty states
  - Error states with retry support

---

### 📝 Notes Module

- Notes list page
- View single note
- Create and edit notes
- Rich text or markdown editor
- Autosave functionality using debounced mutations

---

## 🗂️ Project Folder Structure

```
src/
├── app/                # Next.js App Router pages & layouts
│   ├── layout.tsx
│   ├── globals.css
│   ├── login/
│   │   └── page.tsx
│   ├── tasks/
│   │   └── page.tsx
│   ├── notes/
│   │   └── page.tsx
│
├── global/             # Global configuration & constants
│   └── constants.ts
│
├── hooks/              # Custom React hooks
│   ├── useAuthGuard.ts
│   ├── useTasksData.ts
│   └── useNotesData.ts
│
├── services/           # API & data access layer
│   └── auth.ts
│
├── schemas/            # Zod validation schemas
│   └── loginSchema.ts
│
├── models/             # Shared TypeScript types
│   └── types.model.ts
│
├── ui/                 # Reusable UI components & utilities
│   ├── components/
│   ├── icons/
│   └── utilities/
│
├── providers/          # App-level providers (React Query)
│   └── QueryProvider.tsx
│
└── data/               # Mock / static data helpers
    └── data.ts
```

---

## 🧠 Design Decisions

- **Next.js App Router** was used to align with modern Next.js standards.
- **TanStack Query** manages all server state, caching, and optimistic updates.
- Authentication is intentionally mocked to keep the project frontend-focused.
- **Zod schemas** provide type-safe and consistent form validation.
- JSON Server allows fast iteration without a real backend.

---

## ⚠️ Known Limitations

- The application can be further optimized for **Next.js-specific patterns**.
- Server-state could be stored in a more centralized manner to be shared across the entire application.
- The application needs improved **UI/UX** to deliver a better overall user experience.
- Transitions and animations in the **Tasks module** are not smooth and can be enhanced.

---

## 🔮 Future Improvements

- Improve Next.js performance optimizations.
- Centralize server-state management for better scalability.
- Enhance UI/UX and animations across the application.
- Implement sorting and search.
- Integrate real authentication (JWT / OAuth).
