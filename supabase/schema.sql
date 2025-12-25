DROP TABLE IF EXISTS admissions CASCADE;

CREATE TABLE admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
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
  message TEXT,
  -- Approval workflow fields
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  approval_token UUID DEFAULT gen_random_uuid(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT
);

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts" ON admissions;
CREATE POLICY "Allow public inserts" ON admissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated reads" ON admissions;
CREATE POLICY "Allow authenticated reads" ON admissions FOR SELECT USING (auth.role() = 'authenticated');

-- Allow public to read by approval token (for review pages)
DROP POLICY IF EXISTS "Allow public reads by token" ON admissions;
CREATE POLICY "Allow public reads by token" ON admissions FOR SELECT USING (true);

-- Allow updates via approval token
DROP POLICY IF EXISTS "Allow public updates by token" ON admissions;
CREATE POLICY "Allow public updates by token" ON admissions FOR UPDATE USING (true);

CREATE INDEX IF NOT EXISTS admissions_created_at_idx ON admissions(created_at DESC);
CREATE INDEX IF NOT EXISTS admissions_parent_email_idx ON admissions(parent_email);
CREATE INDEX IF NOT EXISTS admissions_approval_token_idx ON admissions(approval_token);