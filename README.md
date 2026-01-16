# FindYourKing 👑

**Royal Dating for Kings** - Premium LGBTQ+ dating app combining the best features of MachoBB and ROMEO.

## Features

### Core Features (Inspired by ROMEO + MachoBB)
- 🎯 **Geolocation Radar** - Discover nearby users with real-time distance
- 💬 **Real-time Chat** - Powered by Stream Chat
- 👥 **Groups & Events** - Community features for connections
- 🌍 **Travel Mode** - See travelers arriving in your city
- ⭐ **Premium PLUS Features** - Enhanced visibility and unlimited messaging
- ✅ **Verified Profiles** - Build trust in the community
- 🏷️ **Advanced Tags** - Roles, body types, ethnicities, interests

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Real-time Chat**: Stream Chat
- **Styling**: Tailwind CSS with custom royal purple/cyan/gold branding
- **Auth**: Supabase Auth
- **Deployment**: Vercel-ready

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Habisync/findyourking-nextjs.git
cd findyourking-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stream Chat
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key_here
STREAM_API_SECRET=your_stream_api_secret_here

# Optional: Mapbox for maps
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Optional: Stripe for payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
STRIPE_SECRET_KEY=your_stripe_secret_here
```

### 4. Set up Supabase Database

Create the following tables in your Supabase project:

- `profiles` (user profiles with location, tags, premium status)
- `matches` (user connections)
- `messages` (chat messages)
- `groups` (community groups)
- `events` (meetups and events)

Refer to the Supabase dashboard to create tables with appropriate RLS policies.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
findyourking-nextjs/
├── app/
│   ├── globals.css          # Global styles with branding
│   ├── layout.tsx            # Root layout with fonts and BottomNav
│   ├── page.tsx              # Homepage
│   └── radar/
│       └── discover/
│           └── page.tsx      # Main Radar page (ROMEO-style)
├── components/
│   ├── BottomNav.tsx         # Bottom navigation
│   └── ProfileCard.tsx       # User profile card component
├── lib/
│   └── supabase.ts           # Supabase client and types
├── package.json
├── tailwind.config.ts        # Royal purple/cyan/gold theme
└── tsconfig.json
```

## Key Pages

- `/` - Landing page with branding and CTAs
- `/radar/discover` - Main radar page with NEW, TRAVELERS, EYECANDY, HUNQZ sections
- `/cruise` - Browse users (to be implemented)
- `/chat` - Real-time messaging (to be implemented)
- `/groups` - Community groups (to be implemented)

## Deployment

### Deploy to Vercel

```bash
npm run build
vercel --prod
```

Make sure to add all environment variables in your Vercel project settings.

## License

MIT License

## Acknowledgments

- Inspired by **ROMEO** (radar, discover, nearby features)
- Inspired by **MachoBB** (premium features, tags system)
- Built with modern Next.js 16 and Supabase
