-- Valderrama International School - Registration System Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Parents table
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Center Activities (configurable catalog)
CREATE TABLE IF NOT EXISTS learning_center_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_es VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_es TEXT,
  description_en TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Intensity Options (configurable catalog)
CREATE TABLE IF NOT EXISTS intensity_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hours_per_week INTEGER NOT NULL,
  sessions_per_week INTEGER NOT NULL,
  label_es VARCHAR(100) NOT NULL,
  label_en VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  application_type VARCHAR(20) NOT NULL CHECK (application_type IN ('preschool', 'learning_center', 'both')),
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_review', 'missing_docs', 'accepted', 'rejected')),
  preschool_level VARCHAR(20) CHECK (preschool_level IN ('nursery', 'maternal', 'prekinder', 'kinder')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Center Preferences
CREATE TABLE IF NOT EXISTS learning_center_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  subjects TEXT[] NOT NULL,
  intensity_hours_per_week INTEGER NOT NULL,
  preferred_schedule TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preschool Documents
CREATE TABLE IF NOT EXISTS preschool_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('birth_certificate', 'vaccination_card', 'photo', 'previous_records', 'other')),
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default Learning Center activities
INSERT INTO learning_center_activities (name_es, name_en, description_es, description_en, sort_order) VALUES
  ('Matemáticas', 'Mathematics', 'Álgebra, geometría, cálculo y estadística', 'Algebra, geometry, calculus and statistics', 1),
  ('Inglés', 'English', 'Gramática, comprensión lectora y conversación', 'Grammar, reading comprehension and conversation', 2),
  ('Español', 'Spanish', 'Literatura, redacción y comprensión lectora', 'Literature, writing and reading comprehension', 3),
  ('Ciencias Naturales', 'Natural Sciences', 'Biología, química y física', 'Biology, chemistry and physics', 4),
  ('Ciencias Sociales', 'Social Sciences', 'Historia, geografía y civismo', 'History, geography and civics', 5),
  ('Economía', 'Economics', 'Microeconomía, macroeconomía y finanzas personales', 'Microeconomics, macroeconomics and personal finance', 6),
  ('Filosofía', 'Philosophy', 'Lógica, ética y pensamiento crítico', 'Logic, ethics and critical thinking', 7),
  ('Ética y Liderazgo', 'Ethics & Leadership', 'Desarrollo personal y habilidades de liderazgo', 'Personal development and leadership skills', 8)
ON CONFLICT DO NOTHING;

-- Insert default intensity options
INSERT INTO intensity_options (hours_per_week, sessions_per_week, label_es, label_en, sort_order) VALUES
  (4, 2, '4 horas/semana (2 sesiones)', '4 hours/week (2 sessions)', 1),
  (6, 3, '6 horas/semana (3 sesiones)', '6 hours/week (3 sessions)', 2),
  (8, 4, '8 horas/semana (4 sesiones)', '8 hours/week (4 sessions)', 3),
  (10, 5, '10 horas/semana (5 sesiones)', '10 hours/week (5 sessions)', 4)
ON CONFLICT DO NOTHING;

-- Row Level Security (RLS) Policies
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_center_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE preschool_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_center_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE intensity_options ENABLE ROW LEVEL SECURITY;

-- Public read access for catalog tables
CREATE POLICY "Public can read active activities" ON learning_center_activities
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active intensity options" ON intensity_options
  FOR SELECT USING (is_active = true);

-- Parents can insert their own data
CREATE POLICY "Anyone can insert parents" ON parents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Parents can view own data" ON parents
  FOR SELECT USING (auth.uid() = auth_user_id OR auth.uid() IS NULL);

-- Students policies
CREATE POLICY "Anyone can insert students" ON students
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Parents can view own students" ON students
  FOR SELECT USING (
    parent_id IN (SELECT id FROM parents WHERE auth_user_id = auth.uid())
    OR auth.uid() IS NULL
  );

-- Applications policies
CREATE POLICY "Anyone can insert applications" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Parents can view own applications" ON applications
  FOR SELECT USING (
    student_id IN (
      SELECT s.id FROM students s
      JOIN parents p ON s.parent_id = p.id
      WHERE p.auth_user_id = auth.uid()
    )
    OR auth.uid() IS NULL
  );

-- Learning Center Preferences policies
CREATE POLICY "Anyone can insert learning center preferences" ON learning_center_preferences
  FOR INSERT WITH CHECK (true);

-- Preschool Documents policies
CREATE POLICY "Anyone can insert preschool documents" ON preschool_documents
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for documents (run this separately in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('admission-documents', 'admission-documents', false);

-- Storage policies (run after creating bucket)
-- CREATE POLICY "Anyone can upload admission documents" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'admission-documents');

-- CREATE POLICY "Authenticated users can view own documents" ON storage.objects
--   FOR SELECT USING (bucket_id = 'admission-documents' AND auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_parents_updated_at
  BEFORE UPDATE ON parents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
