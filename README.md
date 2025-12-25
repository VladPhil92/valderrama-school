# Valderrama International School Website

A modern, bilingual (Spanish/English) Next.js website for Valderrama International School in Cartagena, Colombia.

## Features

- 🌍 **Bilingual Support**: Full Spanish and English translations using next-intl
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎓 **Admissions Form**: Complete form with database integration and WhatsApp notifications
- 🗄️ **Database**: Supabase integration for storing admissions data
- 📲 **Real-time Notifications**: WhatsApp notifications for new admissions
- 🎨 **Modern UI**: Clean, professional design with Lucide icons
- ⚡ **Fast Performance**: Built with Next.js 15 and Turbopack

## Pages

- **Home** (`/`) - School overview, mission, vision, values
- **About** (`/about`) - Institutional information
- **Programs** (`/programs`) - Academic programs and methodology
- **Admissions** (`/admissions`) - Admissions process and application form
- **Student Life** (`/student-life`) - Activities and community
- **Learning Center** (`/learning-center`) - Tutoring services
- **Community** (`/community`) - Community engagement
- **Contact** (`/contact`) - Contact information

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Internationalization**: next-intl
- **Database**: Supabase (PostgreSQL)
- **Notifications**: WhatsApp Business Cloud API
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account (free)
- Meta Developer account (for WhatsApp notifications)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VladPhil92/valderrama-school.git
cd valderrama-school
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# WhatsApp (optional)
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
```

4. Set up Supabase database:
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase/schema.sql` in the SQL Editor
   - See `SUPABASE_SETUP.md` for detailed instructions

5. (Optional) Set up WhatsApp notifications:
   - Follow instructions in `WHATSAPP_SETUP.md`
   - Without this, forms will still work but won't send notifications

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The `admissions` table stores form submissions with:

- Student information (name, document, birthdate, grade)
- Parent/guardian details (name, document, contact info, address)
- Additional information (previous school, medical conditions, special needs)
- Metadata (submission timestamp)

**Security**: Row Level Security (RLS) enabled - public can insert, only authenticated users can read.

## WhatsApp Notifications

When a new admission form is submitted:
1. Data is saved to Supabase
2. A WhatsApp message is sent to +57 318 6428218
3. Message includes all candidate details in Spanish
4. Timestamp is in Colombia timezone

## Deployment

### Deploy to Render

1. Push code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Add environment variables (see Environment Variables section)
7. Deploy!

### Environment Variables for Production

Add these in your Render dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
NODE_VERSION=20
```

## Project Structure

```
├── app/
│   ├── [locale]/           # Localized pages
│   │   ├── about/
│   │   ├── admissions/
│   │   ├── community/
│   │   ├── contact/
│   │   ├── learning-center/
│   │   ├── programs/
│   │   ├── student-life/
│   │   ├── page.tsx        # Home page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css
│   └── api/
│       └── admissions/     # API endpoint for form submissions
├── components/
│   ├── AdmissionsForm.tsx  # Main form component
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ContactForm.tsx
├── i18n/
│   └── request.ts          # i18n configuration
├── lib/
│   └── supabase.ts         # Supabase client
├── messages/
│   ├── en.json             # English translations
│   └── es.json             # Spanish translations
├── public/
│   └── images/             # School images
├── supabase/
│   └── schema.sql          # Database schema
├── middleware.ts           # Locale detection
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Internationalization

The site supports Spanish (default) and English:

- Routes: `/es/*` and `/en/*`
- Translation files: `messages/es.json` and `messages/en.json`
- Automatic locale detection based on browser settings
- Language switcher in navigation

## Maintenance

### Viewing Admissions

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to Table Editor
3. Select `admissions` table
4. View, export, or manage submissions

### Updating Content

Edit translation files:
- `messages/es.json` for Spanish
- `messages/en.json` for English

### Adding Images

Place images in `public/images/` and reference them with `/images/filename.png`

## Support

For questions or issues:
- Email: admisiones@valderramainternationalschool.com
- WhatsApp: +57 318 6428218

## License

© 2025 Valderrama International School. All rights reserved.

## Documentation

- [Supabase Setup Guide](SUPABASE_SETUP.md)
- [WhatsApp Setup Guide](WHATSAPP_SETUP.md)

---

Built with ❤️ for Valderrama International School
