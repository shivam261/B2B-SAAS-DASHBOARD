

# 🏥 HealthCare Intelligence SaaS
**A High-Performance B2B Healthcare Dashboard & Patient Management System**

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](your-vercel-link-here)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
### Project Objective
Developed as a specialized B2B solution for healthcare providers, this application demonstrates a robust frontend architecture capable of handling real-time medical analytics, sensitive patient data management, and instant emergency notifications.

---

### Tech Stack & Architecture
*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript (Ensuring 100% type safety)
*   **Authentication:** Firebase Auth v10 (Email/Password & Session Management)
*   **Styling:** Tailwind CSS + Lucide Icons + Shadcn UI
*   **Analytics:** Recharts (SVG-based interactive charts)
*   **Notifications:** Service Worker + Firebase Cloud Messaging (FCM)

---

### Key Features & Implementation Details

#### 1. Robust Authentication & Session Handling
*   **Firebase Integration:** Secure login/signup flow with real-time validation and error handling.
*   **Persistent Sessions:** Implemented session logic where the user's auth state is synchronized across the app, ensuring a seamless experience even after browser refreshes.

#### 2. Clinical Analytics & Intelligence
*   **Real-time Dashboards:** Visualizing "Operational Throughput" (Revenue vs. Salaries vs. Maintenance) and "Bed Occupancy."
*   **Interactive Controls:** Users can switch time ranges (7D, 30D, 1Y), which triggers optimized data re-calculations.

#### 3. Patient Management Module
*   **Dynamic Views:** A sophisticated toggle system allowing users to switch between **Grid View** (for visual identification) and **List View** (for data density).
*   **Advanced Filtering:** Search and filter functionality that persists state during view transitions.

#### 4. Background Push Notifications
*   **Service Worker Engine:** A custom-built Service Worker (`firebase-messaging-sw.js`) that operates on a separate thread from the UI.
*   **Critical Alerts:** Implemented a "Stock Alert" system. When medical supplies (like Oxygen) fall below a threshold, a system-level push notification is triggered even if the tab is in the background.

---

### Performance & Scalability Patterns
To ensure a B2B-grade experience, I implemented several advanced optimization techniques:

*   **Memoization Strategies:** Utilized `useMemo` for heavy chart data processing and `useCallback` for stable function references, minimizing unnecessary re-renders.
*   **Lazy Loading & Code Splitting:** Heavy components (like Analytics Charts and Radar Maps) are loaded using `next/dynamic` with `{ ssr: false }`. This significantly reduced initial bundle size and improved the Time-to-Interactive (TTI).
*   **Reusable Component Design:** Built a library of modular, highly-configurable components (StatCards, ChartContainers, etc.) to ensure a DRY (Don't Repeat Yourself) codebase.
*   **Vercel Deployment:** Configured CI/CD for automated deployments and performance monitoring.

---

### Project Structure
```bash
src/
├── app/              # Next.js 15 App Router (Pages & Layouts)
├── components/       # Component Architecture
│   ├── ui/           # Base UI primitives (Shadcn)
│   └── custom/       # High-level business logic components
├── hooks/            # Custom hooks (Notifications, Auth, Validation)
├── lib/              # Firebase & Third-party SDK configurations
├── data/             # Static constants & Mock analytical data
└── types/            # Global TypeScript interfaces/types
public/
└── firebase-messaging-sw.js  # Service Worker for background messaging

```
### Installation and setup
```
git clone https://github.com/yourusernamehealthcare-saas.git
cd healthcare-saas
npm install
```
### Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
```
### Development Mode:
```npm run dev
```
### Production Build:
```npm run build
npm start
```
### Vercel Deployment:
1. Push your code to GitHub.
2. Connect your GitHub repo to Vercel.
3. Set environment variables in Vercel dashboard.
4. Deploy and monitor performance.
