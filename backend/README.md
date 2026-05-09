# ShilpMitra Backend

Supabase backend for the ShilpMitra AI Artisan Funding Platform.

## Structure

```
backend/
├── sql/
│   └── schema.sql       # 7 Postgres tables with RLS policies
├── scripts/
│   ├── seed.js           # Seeds demo data (users, products, transactions)
│   └── seed-policies.js  # Seeds scheme eligibility criteria
├── package.json
└── .env                  # Supabase credentials (not committed)
```

## Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `sql/schema.sql` in the Supabase SQL editor
3. Copy `.env.example` → `.env` and fill in your keys
4. Run seeds:

```bash
npm install
node scripts/seed.js
node scripts/seed-policies.js
```

## Environment Variables

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

## Tech Stack

- **Database:** Supabase (Postgres + Row Level Security)
- **AI:** Google Gemini API (gemini-1.5-flash)
- **Auth:** Supabase Auth (Phase 2)
