# vendshop-template-services

Universal services template for VendShop — barbershops, hair salons, nail studios, massage, beauty.

## Verticals supported
- Barbershop (dark theme) — default demo
- Hair salon (light/warm theme)
- Nail studio (warm theme)
- Massage/SPA (navy theme)

## Quick start
1. Clone repo
2. `cp .env.local.example .env.local`
3. Set feature flags in `.env.local`
4. `pnpm install --config.node-linker=hoisted`
5. `pnpm db:push` (creates DB tables)
6. `pnpm exec tsx prisma/seed-services.ts` (seeds demo data)
7. `pnpm dev`

## Feature flags
See `.env.local.example` — toggle modules with `true`/`false`.

| Flag | Default | Description |
|------|---------|-------------|
| `NEXT_PUBLIC_ENABLE_BOOKING` | `true` | Online booking calendar |
| `NEXT_PUBLIC_ENABLE_WHATSAPP_BOOKING` | `true` | WhatsApp fallback booking |
| `NEXT_PUBLIC_ENABLE_PAYMENT` | `false` | Stripe online payment |
| `NEXT_PUBLIC_ENABLE_DEPOSIT` | `false` | Deposit at booking |
| `NEXT_PUBLIC_ENABLE_SMS` | `false` | Twilio SMS reminders |
| `NEXT_PUBLIC_ENABLE_DIGITAL` | `false` | Digital products |
| `NEXT_PUBLIC_ENABLE_COURSES` | `false` | Video courses |
| `NEXT_PUBLIC_ENABLE_TEAM` | `true` | Team/masters section |
| `NEXT_PUBLIC_ENABLE_GALLERY` | `true` | Gallery section |
| `NEXT_PUBLIC_REVIEWS_MODE` | `static` | `static` or `dynamic` |
| `NEXT_PUBLIC_THEME` | `dark` | `dark`, `light`, `warm`, `navy` |

## Themes
Set `NEXT_PUBLIC_THEME` in `.env.local`:
- `dark` — copper on black (barbershop)
- `light` — copper on white (modern salon)
- `warm` — saddle-brown on cream (classic)
- `navy` — gold on navy (luxury spa)

## New pages (vs ecommerce template)
- `/` — Landing: Hero → Services → Team → Gallery → Booking → Testimonials → CTA
- `/services` — Services catalog
- `/team/[slug]` — Master profile
- `/courses` — Courses (only when `ENABLE_COURSES=true`)
- `/admin/appointments` — Appointment calendar + list
- `/admin/masters` — Team management
- `/admin/services` — Services management

## API routes
- `GET /api/services` — public service list
- `GET /api/masters` — public masters list
- `GET /api/availability?masterId=&date=&serviceId=` — available time slots
- `POST /api/appointments` — create booking
- `PATCH /api/appointments/[id]` — confirm/cancel/add note

## Deploy
Same as vendshop-template-ecommerce — set env vars in Vercel Dashboard.
Push to GitHub → connect to Vercel → set DATABASE_URL (Neon) and all NEXT_PUBLIC_ flags.
