# Valderrama International School - System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         VALDERRAMA INTERNATIONAL SCHOOL                          │
│                              System Architecture                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │         │                  │         │                  │
│    DEVELOPER     │         │      USERS       │         │   SCHOOL ADMIN   │
│                  │         │                  │         │                  │
└────────┬─────────┘         └────────┬─────────┘         └────────┬─────────┘
         │                            │                            │
         │ git push                   │ HTTPS                      │ Dashboard
         ▼                            ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  ┌─────────────────┐      ┌─────────────────────────────────────────────────┐  │
│  │                 │      │                    RENDER                        │  │
│  │     GITHUB      │      │               (Web Hosting)                      │  │
│  │                 │      │                                                  │  │
│  │  VladPhil92/    │      │  ┌─────────────────────────────────────────┐    │  │
│  │  valderrama-    │──────▶  │           NEXT.JS APP                   │    │  │
│  │  school         │ Auto │  │                                         │    │  │
│  │                 │Deploy│  │  • Bilingual (ES/EN)                    │    │  │
│  │  Repository:    │      │  │  • Server-side rendering                │    │  │
│  │  - /app         │      │  │  • API Routes (/api/admissions)         │    │  │
│  │  - /components  │      │  │  • Static assets                        │    │  │
│  │  - /messages    │      │  │                                         │    │  │
│  │  - /public      │      │  └──────────────────┬──────────────────────┘    │  │
│  │                 │      │                     │                            │  │
│  └─────────────────┘      │                     │ REST API                   │  │
│                           │                     ▼                            │  │
│                           │  ┌─────────────────────────────────────────┐    │  │
│                           │  │         Environment Variables           │    │  │
│                           │  │  • NEXT_PUBLIC_SUPABASE_URL             │    │  │
│                           │  │  • NEXT_PUBLIC_SUPABASE_ANON_KEY        │    │  │
│                           │  │  • WHATSAPP_PHONE_NUMBER_ID             │    │  │
│                           │  │  • WHATSAPP_ACCESS_TOKEN                │    │  │
│                           │  └─────────────────────────────────────────┘    │  │
│                           └─────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          │ Supabase Client
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  SUPABASE                                        │
│                           (Database & Backend)                                   │
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │                        PostgreSQL Database                                  │ │
│  │                                                                             │ │
│  │  ┌─────────────────────────────────────────────────────────────────────┐   │ │
│  │  │                      ADMISSIONS TABLE                                │   │ │
│  │  │                                                                      │   │ │
│  │  │  id (UUID)              │ student_name         │ student_last_name  │   │ │
│  │  │  created_at             │ student_document     │ student_birth_date │   │ │
│  │  │  student_grade          │ parent_name          │ parent_last_name   │   │ │
│  │  │  parent_document        │ parent_email         │ parent_phone       │   │ │
│  │  │  parent_address         │ parent_city          │ previous_school    │   │ │
│  │  │  medical_conditions     │ special_needs        │ how_did_you_hear   │   │ │
│  │  │  message                │                      │                    │   │ │
│  │  └─────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                             │ │
│  │  Row Level Security (RLS):                                                  │ │
│  │  • Public: INSERT only (form submissions)                                   │ │
│  │  • Authenticated: SELECT (admin access)                                     │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Components

### 1. GitHub Repository
- **URL**: https://github.com/VladPhil92/valderrama-school
- **Purpose**: Source code version control
- **Contents**:
  - `/app` - Next.js pages and API routes
  - `/components` - React components
  - `/messages` - Translation files (ES/EN)
  - `/public` - Static assets and images
  - `/lib` - Utility functions and Supabase client

### 2. Render (Web Hosting)
- **Service Type**: Web Service
- **Framework**: Next.js 15
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Auto-Deploy**: Triggered on push to main branch

### 3. Supabase (Database)
- **Database**: PostgreSQL
- **Project**: VladPhil92's Project (nano)
- **Table**: `admissions`
- **Security**: Row Level Security enabled
  - Public can INSERT (form submissions)
  - Only authenticated users can SELECT (admin)

## Data Flow

### 1. Development Workflow
```
Developer ──git push──▶ GitHub ──auto deploy──▶ Render
```

### 2. User Browsing
```
User ──HTTPS──▶ Render ──serves──▶ Next.js Pages (SSR)
```

### 3. Admission Form Submission
```
User ──submit form──▶ /api/admissions ──insert──▶ Supabase
                                      ──notify──▶ WhatsApp (+57 318 6428218)
```

### 4. Admin Access
```
School Admin ──login──▶ Supabase Dashboard ──view──▶ Admissions Table
```

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/[locale]/` | Home page |
| `/[locale]/about` | About Us |
| `/[locale]/programs` | Academic Programs |
| `/[locale]/admissions` | Admissions + Form |
| `/[locale]/student-life` | Student Life |
| `/[locale]/learning-center` | Learning Center |
| `/[locale]/community` | Community |
| `/[locale]/contact` | Contact |
| `/api/admissions` | POST - Submit admission form |

**Locales**: `es` (Spanish - default), `en` (English)

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp Business API phone ID |
| `WHATSAPP_ACCESS_TOKEN` | WhatsApp Business API token |

## Database Schema

### Admissions Table
```sql
CREATE TABLE admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  student_name TEXT NOT NULL,
  student_last_name TEXT NOT NULL,
  student_document TEXT,
  student_birth_date DATE NOT NULL,
  student_grade TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  parent_last_name TEXT NOT NULL,
  parent_document TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_address TEXT NOT NULL,
  parent_city TEXT NOT NULL,
  previous_school TEXT,
  medical_conditions TEXT,
  special_needs TEXT,
  how_did_you_hear TEXT,
  message TEXT
);
```

## Future Enhancements (Planned)

- [ ] Student/Teacher authentication portal
- [ ] WhatsApp Business API integration
- [ ] Email notifications for admissions
- [ ] Admin dashboard for viewing submissions
- [ ] Payment integration for enrollment fees
