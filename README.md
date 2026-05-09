# ShilpMitra — AI Artisan Funding Platform

> AI-powered platform that empowers rural Indian artisans with government scheme navigation, digital trade records, and intelligent document generation.

## 🏗️ Architecture

```
shilpmitra/
├── frontend/          # React + Vite app + Vercel serverless API routes
│   ├── src/           # React components, pages, hooks, stores
│   ├── api/           # Serverless functions (agent, chat, PDF, notifications)
│   └── public/        # Static assets
└── backend/           # Database scripts & SQL schema
    ├── scripts/       # Supabase seed scripts
    └── sql/           # PostgreSQL schema
```

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Framer Motion, Zustand |
| **AI Agent** | Google Gemini 2.5 Flash (client-side + serverless) |
| **Database** | Supabase (PostgreSQL + RLS + Storage) |
| **Deployment** | Vercel (static + serverless functions) |
| **PDF Engine** | jsPDF (client-side & server-side) |
| **Languages** | English, Hindi, Kannada |

## ✨ Key Features

- **🤖 AI Agent** — Scheme eligibility check, document guidance, bank proof generation
- **📄 Smart Documents** — Auto-generate bank proof, income certificate, trade records, loan applications from real sales data
- **✅ Scheme Navigator** — PM Vishwakarma, MUDRA, SFURTI eligibility with AI-powered scoring
- **📊 Trade Ledger** — UPI-verified transaction history with PDF export
- **🏪 Marketplace** — Product listings with AI-powered image analysis
- **🎤 Voice Input** — Speak in Hindi/Kannada/English to interact with the AI agent
- **🌐 Multilingual** — Full Hindi, Kannada, and English support

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- Supabase account
- Google Gemini API key

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # Add your API keys
npm run dev            # http://localhost:5173
```

### Database Seeding
```bash
cd backend
npm install
cp .env.example .env   # Add Supabase credentials
node scripts/seed.js
node scripts/seed-policies.js
```

### Environment Variables
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GEMINI_API_KEY=your-gemini-key
SUPABASE_SERVICE_KEY=your-service-key
```

## 🌐 Live Demo

**[https://frontend-eight-psi-21.vercel.app](https://frontend-eight-psi-21.vercel.app)**

## 📱 Pages

| Page | Description |
|------|------------|
| `/` | Landing page with language toggle |
| `/dashboard` | Sales analytics & stats from Supabase |
| `/marketplace` | Product grid with craft filtering |
| `/listings` | Artisan's own product listings |
| `/trade-ledger` | Transaction history + PDF export |
| `/schemes` | AI Scheme Navigator with embedded chatbot |
| `/profile` | Artisan profile from database |

## 👥 Team

Built for empowering rural Indian artisans through AI and digital tools.
