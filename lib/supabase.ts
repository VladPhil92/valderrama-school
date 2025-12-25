import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AdmissionSubmission = {
  id?: string;
  created_at?: string;
  student_name: string;
  student_last_name: string;
  student_document?: string;
  student_birth_date: string;
  student_grade: string;
  parent_name: string;
  parent_last_name: string;
  parent_document: string;
  parent_email: string;
  parent_phone: string;
  parent_address: string;
  parent_city: string;
  previous_school?: string;
  medical_conditions?: string;
  special_needs?: string;
  how_did_you_hear?: string;
  message?: string;
};
