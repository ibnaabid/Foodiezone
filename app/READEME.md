# 🍽️ CravingByte

A full-stack restaurant ordering platform with real-time chat, AI-powered assistance, and role-based dashboards for customers and restaurant owners.

**Live App:** [foodiezone-nu.vercel.app](https://foodiezone-nu.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** — Email/password + Google OAuth via Better Auth, with role-based access (customer / restaurant / admin)
- 🍔 **Menu Management** — Restaurants can add, update, and remove menu items
- ❤️ **Wishlist / Favorites** — Customers can save favorite dishes
- ⭐ **Reviews** — Customers can rate and review the platform
- 💬 **AI Chat Assistant** — Streaming AI chat (via OpenRouter) with conversation history and smart follow-up suggestions
- 💳 **Stripe Checkout** — Secure payments for orders
- 🔌 **Real-time Chat** — Socket.io powered order-specific and general support chat
- 📊 **Role-based Dashboards** — Separate dashboard experiences for customers and restaurant owners
- 🛡️ **Protected Routes** — Edge middleware + server-side session verification

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Better Auth (React client)**
- **lucide-react** (icons)

### Backend

- **Express.js** (TypeScript)
- **MongoDB** (native driver, Atlas-hosted)
- **Better Auth** (MongoDB adapter)
- **OpenRouter API** (AI chat — `meta-llama/llama-3.3-70b-instruct:free`)
- **Stripe** (payments)
- **Socket.io** (real-time chat)

### Deployment

- **Vercel** — Frontend + Backend

---

## 📁 Project Structure

```
cravingbyte/
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── onboarding/          # Role selection after Google sign-up
│   │   ├── dashboard/
│   │   │   ├── customer/
│   │   │   ├── restaurant/
│   │   │   └── admin/
│   │   └── lib/
│   │       └── auth-client.ts
│   ├── components/
│   │   └── ChatWidget.tsx        # AI chat widget (streaming + suggestions)
│   └── middleware.ts             # Edge-safe route protection
│
└── backend/
    ├── lib/
    │   ├── auth.ts                # Better Auth config
    │   └── mongodb.ts             # Global-cached MongoDB connection
    ├── middleware/
    │   └── auth.ts                # verifyToken / verifyAdmin
    └── index.ts                   # Express app + all routes
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=https://your-backend-url.vercel.app
BETTER_AUTH_SECRET=your_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

> ⚠️ Do **not** set a `PORT` environment variable on Vercel — it manages ports automatically. Setting it manually will crash the serverless function.

---

## 🚀 Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Google OAuth Setup

In [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth Client:

**Authorized JavaScript origins**

```
https://foodiezone-nu.vercel.app
http://localhost:3000
```

**Authorized redirect URIs**

```
https://your-backend-url.vercel.app/api/auth/callback/google
http://localhost:5000/api/auth/callback/google
```

---

## 🧩 Key Architecture Notes

- **Session strategy**: JWT-based sessions via Better Auth, stored in httpOnly cookies. All frontend fetches use `credentials: "include"`.
- **Role handling**: `role` is a Better Auth `additionalField` (`customer` / `restaurant` / `admin`), set at signup for email/password and via a post-onboarding step for Google OAuth.
- **Route protection**: Next.js `middleware.ts` does a fast, Edge-safe check using Better Auth's cookie cache; each dashboard layout re-verifies the session server-side against MongoDB for real security.
- **AI Chat**: Backend streams tokens via Server-Sent Events (SSE) from OpenRouter, stores conversation history in MongoDB, and generates follow-up question suggestions after each reply.

---

## 📄 License

This project was built as part of the Programming Hero MERN Stack Bootcamp (2025).
