# 🏡 EasyStay – Short-Term Rental Marketplace

![EasyStay Banner](public/banner.png) <!-- replace with your own banner -->

**EasyStay** is a modern **Next.js 15** short-term rental marketplace where guests can browse, filter, and instantly book stays while hosts can list properties, set dynamic pricing, and chat with guests in real time.

Live Demo: [https://easy-stay.vercel.app](easy-stay-liart.vercel.app)

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| **Responsive UI** | Built with **Next.js App Router**, **Tailwind CSS**, **shadcn/ui**, dark mode, sticky navbar & mobile slide-in menu |
| **Live Location Tracer** | GeoJSON points stored in MongoDB, interactive Mapbox/Leaflet map with marker clustering |
| **Dynamic Pricing** | Seasonal, weekday/weekend, cleaning fees, per-guest pricing – calculated on client **and** server |
| **Booking Flow** | Browse → Details → Dates & Guests → Instant Quote → Confirm |
| **Real-time Chat** | Powered by **GetStream** – read receipts, attachments, system messages |
| **Reviews & Ratings** | 1-5 star system with aggregated scores and distribution charts |
| **Authentication** | **NextAuth.js** – Google, GitHub, Facebook, Email/Password |
| **Admin Dashboard** | Manage stays, bookings, users, and disputes |
| **Form Validation** | **Zod** + **react-hook-form** |
| **Backend** | **MongoDB + Mongoose**, Next.js API routes / Server Actions |

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Icons**: Lucide React
- **Forms**: react-hook-form + Zod
- **Auth**: NextAuth.js
- **Realtime Chat**: GetStream Chat
- **Maps**: Mapbox GL JS (or Leaflet)
- **Database**: MongoDB + Mongoose
- **Deployment**: Vercel (frontend), MongoDB Atlas (DB)

---

## 📦 Installation & Local Setup

```bash
git clone https://github.com/azijulhakimbd/Easy-Stay.git
cd Easy-Stay
npm install
