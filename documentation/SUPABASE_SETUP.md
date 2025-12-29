# Supabase Setup Instructions

## 1. Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

## 2. Run the Database Schema
1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Paste and run it in the SQL Editor
4. This creates the `admissions` table with proper security policies

## 3. Get Your API Keys
1. Go to Project Settings > API
2. Copy your project URL
3. Copy your `anon` public key (not the service_role key)

## 4. Configure Environment Variables
1. Create a `.env.local` file in the project root
2. Add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 5. Deploy to Render
1. In your Render dashboard, go to your web service
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy the service

## 6. View Submissions
To view form submissions:
1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Select the `admissions` table
4. All submissions will appear here

## Free Tier Limits
- 500MB database storage
- 2GB bandwidth per month
- 50,000 monthly active users
- More than enough for a school admissions form!

## Security
- Row Level Security (RLS) is enabled
- Public can only INSERT (submit forms)
- Only authenticated users can SELECT (view submissions)
- Data is encrypted at rest and in transit
