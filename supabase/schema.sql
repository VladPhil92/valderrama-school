-- Admissions Table for Valderrama International School
-- Run this in Supabase SQL Editor

DROP TABLE IF EXISTS admissions CASCADE;

CREATE TABLE admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Student Information
  student_name TEXT NOT NULL,
  student_last_name TEXT NOT NULL DEFAULT '',
  student_document TEXT,
  student_birth_date DATE,
  student_grade TEXT NOT NULL,
  
  -- Parent/Guardian Information
  parent_name TEXT NOT NULL,
  parent_last_name TEXT DEFAULT '',
  parent_document TEXT DEFAULT '',
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_address TEXT DEFAULT '',
  parent_city TEXT DEFAULT '',
  
  -- Additional Information
  previous_school TEXT,
  medical_conditions TEXT,
  special_needs TEXT,
  how_did_you_hear TEXT,
  message TEXT,
  
  -- Status and Workflow
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'contacted')),
  approval_token UUID DEFAULT gen_random_uuid(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public form submissions)
DROP POLICY IF EXISTS "Allow public inserts" ON admissions;
CREATE POLICY "Allow public inserts" ON admissions 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow anyone to read (for admin review - in production, restrict this)
DROP POLICY IF EXISTS "Allow public reads" ON admissions;
CREATE POLICY "Allow public reads" ON admissions 
  FOR SELECT 
  TO anon, authenticated
  USING (true);

-- Policy: Allow updates (for status changes)
DROP POLICY IF EXISTS "Allow public updates" ON admissions;
CREATE POLICY "Allow public updates" ON admissions 
  FOR UPDATE 
  TO anon, authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS admissions_created_at_idx ON admissions(created_at DESC);
CREATE INDEX IF NOT EXISTS admissions_parent_email_idx ON admissions(parent_email);
CREATE INDEX IF NOT EXISTS admissions_status_idx ON admissions(status);
CREATE INDEX IF NOT EXISTS admissions_approval_token_idx ON admissions(approval_token);

-- Grant permissions to anon role (important for public access)
GRANT INSERT, SELECT, UPDATE ON admissions TO anon;
GRANT INSERT, SELECT, UPDATE ON admissions TO authenticated;