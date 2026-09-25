# Thresh Studio — Contribution Guide

> This guide applies to **all contributors**: human developers and AI coding assistants (LLMs) alike.
> Every rule here exists because the codebase already follows it. Don't deviate without a strong reason — and document when you do.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [File Size Limit](#3-file-size-limit)
4. [Separation of Concerns](#4-separation-of-concerns)
5. [DRY — Don't Repeat Yourself](#5-dry--dont-repeat-yourself)
6. [TypeScript Rules](#6-typescript-rules)
7. [API Route Patterns](#7-api-route-patterns)
8. [Service Layer](#8-service-layer)
9. [Database & Mongoose Patterns](#9-database--mongoose-patterns)
10. [Serializers](#10-serializers)
11. [Zod Schemas](#11-zod-schemas)
12. [Animation & Performance (GSAP)](#12-animation--performance-gsap)
13. [Loading, Error & Empty Fallbacks](#13-loading-error--empty-fallbacks)
14. [Component Guidelines](#14-component-guidelines)
15. [Commenting & Documentation](#15-commenting--documentation)
16. [Naming Conventions](#16-naming-conventions)
17. [Security Rules](#17-security-rules)
18. [Environment Variables](#18-environment-variables)
19. [Authentication Architecture](#19-authentication-architecture)

---

## 1. Project Overview

Thresh Studio is a **premium product branding and cinematic marketing portfolio** built with:

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Animations**: GSAP (`@gsap/react`), Framer Motion (Cursor)
- **Scrolling**: Lenis (Smooth Scroll)
- **3D Rendering**: React Three Fiber / Drei
- **Database**: MongoDB via Mongoose (Admin Dashboard)
- **Auth**: NextAuth v5 (Admin Login)
- **Validation**: Zod
- **Styling**: Tailwind CSS + shadcn/ui
- **Media**: Cloudinary (Optimized HTML5 Video & Images)

---

## 2. Folder Structure

```
thresh-studio/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/                # All backend API route handlers
│   │   ├── admin/          # Admin-scoped API routes
│   ├── admin/              # Admin dashboard pages (Protected)
│   ├── work/               # Portfolio case studies
│   └── (public pages)      # Landing, Contact, Capabilities
│
├── components/
│   ├── shared/             # Reusable cross-feature components (Skeletons, Fallbacks)
│   ├── ui/                 # shadcn/ui primitives ONLY — no business logic here
│   ├── admin/              # Admin dashboard components
│   ├── sections/           # Large landing page sections (Hero, Footer, Testimonials)
│   ├── motion/             # Animation wrappers (SmoothScroll)
│   ├── cursor/             # Custom cursor context and UI
│   └── media/              # Media components (Cloudinary Video, Images)
│
├── hooks/                  # Data-fetching and UI hooks
├── lib/
│   ├── services/           # Server-only DB query functions
│   ├── schemas.ts          # All Zod validation schemas + inferred types
│   ├── types.ts            # All shared TypeScript interfaces
│   ├── serializers.ts      # Mongoose .lean() → plain JSON mappers
│   ├── db.ts               # MongoDB connection singleton
│   ├── utils.ts            # Tailwind/cn helpers
│   └── gsap.ts             # Global GSAP registration
│
├── models/                 # Mongoose models (Project.ts, User.ts)
└── types/                  # Global TypeScript declaration files
```

### Rules

- **Never** place business logic inside `components/ui/`. Those are primitives.
- **Never** create a new top-level folder without team discussion.
- Feature-specific components live in their feature folder (`admin/`, `sections/`, etc.).
- API routes mirror their UI counterpart.

---

## 3. File Size Limit

> **Hard limit: 450 lines per file.**

If a file is approaching 450 lines:
1. **Split by concern** — extract sub-components, hooks, or helper functions into their own files.
2. **Extract animations** — complex GSAP timelines can be extracted into custom hooks.
3. **Extract sub-sections** — large UI sections become their own named components.

---

## 4. Separation of Concerns

Each layer has **one job**. Do not mix them.

| Layer | Responsibility | Location |
|---|---|---|
| **Page** | Compose layout, fetch server data, pass to components | `app/**/page.tsx` |
| **Component** | Render UI, handle animations & local interactions | `components/` |
| **Hook** | Encapsulate data-fetching or reusable stateful logic | `hooks/` |
| **Service** | Complex DB queries shared between routes and pages | `lib/services/` |
| **API Route** | HTTP layer: validate input → call service → return response | `app/api/**/route.ts` |
| **Model** | Define DB schema and indexes | `models/` |
| **Serializer** | Convert Mongoose docs to clean frontend JSON | `lib/serializers.ts` |
| **Schema** | Validate and infer types from user input | `lib/schemas.ts` |

---

## 5. DRY — Don't Repeat Yourself

### Shared types
Types must be organized by domain in the `/types` directory. Never dump generic types into a massive monolithic file.

### Shared DB queries
If the same query is needed in both an API route and a Server Component, extract it to `lib/services/`. Never copy-paste DB logic.

---

## 6. TypeScript Rules

- **Strict mode is on.** Do not suppress errors with `// @ts-ignore` or `as any` without a documented reason.
- **Prefer `null` over `undefined`** for optional DB fields.
- **Always export inferred Zod types** alongside the schema.

---

## 7. API Route Patterns

Every file in `app/api/` must follow this structure:

```ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { mySchema } from "@/lib/schemas";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    // 1. Auth check (if protected)
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 2. Parse + validate query params or body via Zod
    // 3. Connect to DB only AFTER auth and validation succeed
    await dbConnect();

    // 4. Call service or model
    // 5. Serialize result & Return response
    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/admin/projects]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

### Rules
- **Always** call `await dbConnect()` before any Mongoose operation.
- **Always** validate request bodies with Zod `.safeParse()`.
- **Always** prefix error logs with the route path.

---

## 8. Service Layer

Files in `lib/services/` are **server-only** modules. They hold complex DB queries reused across API routes and Server Components.

- Call `await dbConnect()` inside the function.
- Return **serialized plain objects**, never raw Mongoose documents.

---

## 9. Database & Mongoose Patterns

### Model structure
- Always enable `timestamps: true`.
- Declare indexes for every field used in a filter/sort.

### Query rules
- Use `.lean()` for read-only queries — faster and returns plain objects.
- When using `.lean()`, always run the result through a **serializer**.

---

## 10. Serializers

All Mongoose `.lean()` documents must pass through a serializer in `lib/serializers.ts` before being sent to the client.

```ts
import { serializeProject } from "@/lib/serializers";
return NextResponse.json(serializeProject(project));
```

---

## 11. Zod Schemas

All validation schemas live in `lib/schemas.ts`. Never define a schema inline inside a component or route handler.

---

## 12. Animation & Performance (GSAP)

> [!CAUTION]
> Performance is critical. Thresh Studio is a heavily animated site. Bad animation code causes immediate lag.

- **No Layout Thrashing:** NEVER animate `top`, `left`, `right`, `bottom`, `width`, or `height` inside a scroll loop or GSAP ticker. Use `clip-path`, `scale`, or `x/y` translations instead.
- **Cleanup GSAP:** Always wrap GSAP code inside the `@gsap/react` `useGSAP()` hook to ensure `ScrollTrigger` instances are properly killed on unmount.
- **Video Tags:** Prefer native HTML5 `<video>` tags pulling from Cloudinary over third-party iframes (Vimeo/YouTube).
- **Blend Modes:** Avoid animating elements that use `mix-blend-mode: difference` or `mix-blend-overlay` over moving backgrounds.

---

## 13. Loading, Error & Empty Fallbacks

**Every data-dependent UI must handle all three states.** 

- **Loading:** Use skeleton loaders (`PageSkeleton`), not full-page spinners.
- **Error:** Catch errors and provide a `<FetchError onRetry={refetch} />` state.
- **Empty:** Never render a blank table. Render an `<EmptyState />` with a CTA.

---

## 14. Component Guidelines

### Rules
- **"use client"** must be the very first line of client components.
- **Never import server-only code** (`lib/db`, Mongoose models) in a client component.
- **Forms live in their own `*Form.tsx` file**.

### Design System & Colours
> [!IMPORTANT]
> **Never hardcode a colour value anywhere in the codebase.** 

All colours must be read from the design tokens defined in `app/globals.css`. 

```tsx
// ❌ BAD — hardcoded colour values
<div className="text-[#00D3DA]">...</div>

// ✅ GOOD — semantic design token
<div className="text-brand-500">...</div>
<div className="bg-background">...</div>
```

---

## 15. Commenting & Documentation

- **Comment the *why*, not the *what*.**
- **File-level headers** are required for services and utilities.
- **JSDoc** for public functions.

---

## 16. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| React components | `PascalCase` | `ProjectCard` |
| Hooks | `camelCase` with `use` prefix | `useProjects` |
| API route files | Always `route.ts` | `app/api/projects/route.ts` |
| Model files | `PascalCase` | `Project.ts` |
| Zod schemas | `camelCase` + `Schema` suffix | `projectFormSchema` |

---

## 17. Security Rules

- **Protect admin routes** — verify the session before any mutation.
- **Never log sensitive data** — no passwords or tokens in `console.log`.
- **Always validate server-side** via Zod.

---

## 18. Environment Variables

- Document every env var in `.env.example`.
- **Server-only secrets** (DB URI, Cloudinary secrets) must **never** have `NEXT_PUBLIC_` prefix.

---

## 19. Authentication Architecture

Thresh Studio uses **NextAuth v5** for the Admin Dashboard.

- **Provider:** Isolated `CredentialsProvider` with `id: "admin-login"`.
- **Route Guard Ownership:** `middleware.ts` handles edge protection for all `/admin/*` routes.
- **Validation:** Credentials are only validated against the `AdminUser` Mongoose model.

---

*Maintained by the Thresh Studio core team.*
