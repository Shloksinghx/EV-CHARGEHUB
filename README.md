# ⚡ EV ChargeHub — Unified EV Charging Aggregator Platform

A full-stack-ready React application that aggregates EV charging stations from multiple networks with AI/ML-powered features.

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6
- **Charts:** Recharts
- **Icons:** Lucide React
- **Protocols:** Simulated OCPI 2.2.1 + OCPP 2.0.1
- **Deploy:** Vercel (zero-config)

## Features
- 🗺️ **Live Station Map** — interactive map with real-time status pins
- 🔍 **Search & Filter** — by network, connector type, distance, availability
- 📅 **Smart Booking** — time slot selection with peak/off-peak pricing
- 🤖 **AI Insights** — LSTM availability prediction, collaborative filtering recs, user clustering
- 💰 **Wallet** — balance management, transaction history, UPI top-up simulation
- ⚡ **Dynamic Pricing** — demand-aware real-time rate engine
- 🔌 **OCPI/OCPP Layer** — simulated protocol client (drop in real endpoints)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your API keys

# 3. Run dev server
npm run dev          # http://localhost:3000

# 4. Build for production
npm run build        # outputs to /dist

# 5. Preview production build
npm run preview
```

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel login
vercel          # follow prompts, auto-detects Vite
vercel --prod   # deploy to production
```

### Option B — GitHub Integration (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add environment variables from `.env.example`
8. Click **Deploy** ✅

### Option C — Vercel Dashboard drag-and-drop
1. Run `npm run build`
2. Drag the `/dist` folder to [vercel.com/new](https://vercel.com/new)

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_OCPI_BASE_URL` | Your OCPI backend URL | For production |
| `VITE_OCPI_TOKEN` | OCPI auth token | For production |
| `VITE_OCPP_WS_URL` | OCPP WebSocket URL | For production |
| `VITE_GOOGLE_MAPS_KEY` | Google Maps API key | For real map |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics | Optional |

## Project Structure

```
ev-chargehub/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Layout.jsx      # Nav + outlet wrapper
│   │   ├── Toast.jsx        # Notification toast
│   │   ├── StatCard.jsx     # Metric stat card
│   │   └── StationCard.jsx  # Station list item
│   ├── context/
│   │   └── AppContext.jsx   # Global state (balance, user, bookings)
│   ├── data/
│   │   └── stations.js      # Simulated OCPI station data
│   ├── hooks/
│   │   └── useOCPI.js       # OCPI/OCPP React hooks
│   ├── pages/
│   │   ├── Dashboard.jsx    # Overview + map + charts
│   │   ├── FindStations.jsx # Search + filter stations
│   │   ├── Booking.jsx      # Slot booking flow
│   │   ├── AIInsights.jsx   # ML models + analytics
│   │   ├── Wallet.jsx       # Balance + transactions
│   │   └── Profile.jsx      # User profile + settings
│   ├── utils/
│   │   ├── ocpi.js          # Simulated OCPI client
│   │   └── aiEngine.js      # AI/ML simulation layer
│   ├── App.jsx             # Route definitions
│   ├── main.jsx            # App entry point
│   └── index.css           # Tailwind + global styles
├── .env.example
├── vercel.json             # Vercel deployment config
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Upgrading to Production

### Replace Simulated OCPI
In `src/utils/ocpi.js`, replace simulated functions with real HTTP calls:
```js
async getLocations(filters) {
  const res = await fetch(`${import.meta.env.VITE_OCPI_BASE_URL}/locations`, {
    headers: { Authorization: `Token ${import.meta.env.VITE_OCPI_TOKEN}` }
  })
  return res.json()
}
```

### Add Real Map (Google Maps / Mapbox)
Replace the SVG map in `Dashboard.jsx` with `@react-google-maps/api` or `react-map-gl`:
```bash
npm install @react-google-maps/api
```

### Add Real Payments
Integrate Razorpay or Stripe for wallet top-ups:
```bash
npm install razorpay
```

### Add Backend / Database
Recommended stack: **Supabase** (auth + DB) + **Vercel Edge Functions**
```bash
npm install @supabase/supabase-js
```

## Recommended Add-ons (Production)
| Feature | Tool |
|---|---|
| Auth | Supabase Auth / Auth0 |
| Database | Supabase / PlanetScale |
| Real-time | Supabase Realtime / Pusher |
| Payments | Razorpay / Stripe |
| Maps | Google Maps / Mapbox |
| Error tracking | Sentry |
| Analytics | PostHog / Mixpanel |
| Push notifications | Firebase FCM |

## License
MIT
