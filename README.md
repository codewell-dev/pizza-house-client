# 🍕 Pizza House — Client

> Next.js 15 storefront for Pizza House. Server-first architecture, ISR caching, fully typed.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server Components, ISR, `generateStaticParams` |
| UI | MUI v7 + Tailwind CSS | Component library + utility classes |
| State | Zustand + Immer | Lightweight cart state with structural sharing |
| Forms | Formik + Yup | Login form validation |
| Carousel | react-slick | Promo banner slider |
| Language | TypeScript (strict) | Full type safety across the codebase |

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/your-org/pizza-house-client.git
cd pizza-house-client
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Open `.env.local` and set your API URL:

```env
API_URL=https://your-backend.com
NEXT_PUBLIC_API_URL=https://your-backend.com
```

> `API_URL` is server-only and never sent to the browser.  
> `NEXT_PUBLIC_API_URL` is available client-side if needed.

### 3. Run

```bash
pnpm dev      # development (Turbopack)
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
pnpm type-check  # TypeScript check without emitting
```

---

## Project Structure

```
pizza-house-client/
├── app/
│   ├── [pizzaId]/          # Product detail page (SSG via generateStaticParams)
│   ├── category/[id]/      # Category page
│   ├── entities/           # Feature-scoped UI components
│   │   ├── basket/         # Cart item card
│   │   ├── components/     # Shared primitives (Multiple counter, CardProduct)
│   │   ├── header/         # Header sub-components (menu, select)
│   │   ├── modal/          # Login form
│   │   ├── pizza/          # Pizza card, variants, skeleton
│   │   └── productId/      # Product page components (modifiers, price box)
│   ├── providers/          # Zustand store context provider
│   ├── stores/             # cartSlice, shop-store
│   ├── widgets/            # Full-width layout sections (Header, Footer, Basket, Carousel)
│   ├── layout.tsx          # Root layout — fonts, metadata, providers
│   └── page.tsx            # Home page
├── lib/
│   └── api.ts              # Centralized fetch layer (server-only)
├── types/
│   └── product.ts          # Shared domain types
├── public/                 # Static assets
├── .env.example            # Environment variable template
└── next.config.ts
```

---

## Architecture Decisions

### Data fetching

All data fetching happens in **Server Components** via `lib/api.ts`. There are no intermediate Next.js API routes — they added an extra network hop with no benefit.

```
Browser → Next.js Server Component → External API
```

Caching strategy per resource:

| Resource | `revalidate` | Reasoning |
|---|---|---|
| Pizza list | 60s | Changes occasionally during the day |
| Categories | 3600s | Rarely changes |
| Product detail | 300s | Stable, but may update |

### Static generation

Product pages are pre-rendered at build time via `generateStaticParams`. This means every `/[pizzaId]` page is served as static HTML — zero server work per request.

```ts
export async function generateStaticParams() {
  const pizzas = await getPizzas();
  return pizzas.flatMap((pizza) =>
    pizza.products.map((p) => ({ pizzaId: p._id.toString() }))
  );
}
```

### Cart state

Cart lives in Zustand with Immer for mutation ergonomics and `persist` middleware for `localStorage`. The store is instantiated once per browser session and injected via React Context to avoid cross-request state leakage in SSR.

```ts
// store is created fresh per request on the server,
// and reused across renders on the client
const storeRef = useRef<ShopStoreApi | null>(null);
if (storeRef.current === null) {
  storeRef.current = createShopStore();
}
```

---

## Environment Variables

| Variable | Required | Used in | Description |
|---|---|---|---|
| `API_URL` | ✅ | Server only | Backend base URL |
| `NEXT_PUBLIC_API_URL` | Optional | Client | Public-facing API URL if different |

---

## Key Conventions

- **No `any`** — all API responses and component props are typed via `types/product.ts`
- **No bare `<img>`** — always use `next/image` for automatic optimization and lazy loading
- **Stable `key` props** — lists always use entity IDs (`cartItemId`, `_id`), never array index
- **MUI overrides via `sx`** — never target internal MUI class names (`.css-xxxx-MuiPaper...`) in global CSS; they change across versions
- **Scroll listeners throttled** via `requestAnimationFrame` — never raw `addEventListener("scroll", fn)`
- **Secrets in env** — API URLs and credentials live in `.env.local`, never in source

---

## Contributing

```bash
# Before opening a PR:
pnpm lint
pnpm type-check
```

1. Branch off `main`
2. Keep commits atomic and descriptive
3. No `any` types — if you're reaching for `any`, define the type instead
4. Server Components by default — only add `"use client"` when you need browser APIs or interactivity

---

## License

Private. All rights reserved.
