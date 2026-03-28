#  VRM Platform — Rwanda Vehicle Registry

A production-grade Vehicle Registration & Management dashboard built with React, TanStack Query, React Hook Form, Zod, and Axios.

---

##  Live Demo

🔗 **[Live Deployment →](https://vehicle-registration-platform.vercel.app/)**

> Credentials: `test@gmail.com` / `Password!234`

---

##  Features

- Public vehicle registry — no login required
- Client-side authentication with localStorage persistence
- Protected routes — unauthenticated users redirected to login
- Multi-step vehicle registration form (3 steps)
- Real-time Zod validation mirroring backend rules exactly
- Tabbed vehicle details using 4 segmented API endpoints
- Full CRUD — create, view, edit, delete with confirmation modal
- TanStack Query caching — prevents over-fetching, auto-invalidates
- Toast notifications for all actions
- Fully responsive mobile sidebar

---

##  Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | UI framework & build tool |
| React Router v6 | Routing & protected routes |
| TanStack Query v5 | Server state, caching & mutations |
| React Hook Form + Zod | Form management & validation |
| Axios | HTTP client |
| Tailwind CSS | Styling |
| react-hot-toast | Notifications |
| Lucide React | Icons |

---

##  Running Locally
```bash
git clone https://github.com/UmChristelle/vehicle-registration-platform
cd vehicle-registration-platform
npm install
npm run dev
```

App runs at **http://localhost:5173**

---

##  Authentication

Simulated client-side using React Context API.

- **Email:** `test@gmail.com` — **Password:** `Password!234`
- Session saved to `localStorage` — persists on refresh
- Wrong credentials show `"Invalid credentials"` error
- `ProtectedRoute` redirects guests back to `/login`

---

##  State Management

- **TanStack Query** — all API data, cached per endpoint (2–5 min), mutations auto-invalidate queries
- **React Context** — global auth state (`isAuthenticated`, `login`, `logout`)
- **React Hook Form** — per-step form state with `mode: "onChange"` for live validation

---

##  Key Validation Rules

- National ID: exactly 16 digits
- Mobile: exactly 10 digits
- Plate: Rwandan format `/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i`
- Year: between 1886 and current year + 1
- Expiry dates: must be in the future
- Company Reg No.: required only when `ownerType === COMPANY`

---

##  API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/vehicle` | Public |
| POST | `/vehicle` | Protected |
| PUT | `/vehicle/:id` | Protected |
| DELETE | `/vehicle/:id` | Protected |
| GET | `/vehicle/:id/info` | Protected |
| GET | `/vehicle/:id/owner` | Protected |
| GET | `/vehicle/:id/registration` | Protected |
| GET | `/vehicle/:id/insurance` | Protected |

---

##  Deployment

Deployed on **Vercel** — `vercel.json` handles SPA routing.

1. Push repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Build command: `npm run build` — Output: `dist`
4. Deploy 