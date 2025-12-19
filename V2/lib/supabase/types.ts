export interface Parent {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  parent_id: string;
  full_name: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  student_id: string;
  application_type: 'preschool' | 'learning_center' | 'both';
  status: 'submitted' | 'in_review' | 'missing_docs' | 'accepted' | 'rejected';
  preschool_level?: 'nursery' | 'maternal' | 'prekinder' | 'kinder';
  created_at: string;
  updated_at: string;
}

export interface LearningCenterPreference {
  id: string;
  application_id: string;
  subjects: string[];
  intensity_hours_per_week: number;
  preferred_schedule?: string;
  notes?: string;
  created_at: string;
}

export interface PreschoolDocument {
  id: string;
  application_id: string;
  document_type: 'birth_certificate' | 'vaccination_card' | 'photo' | 'previous_records' | 'other';
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

export interface LearningCenterActivity {
  id: string;
  name_es: string;
  name_en: string;
  description_es?: string;
  description_en?: string;
  is_active: boolean;
}

export interface IntensityOption {
  id: string;
  hours_per_week: number;
  sessions_per_week: number;
  label_es: string;
  label_en: string;
  is_active: boolean;
}

export type RegistrationStep = 
  | 'parent_info'
  | 'student_info'
  | 'service_selection'
  | 'learning_center'
  | 'preschool'
  | 'documents'
  | 'review';

export interface RegistrationFormData {
  // Parent info
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  
  // Student info
  studentName: string;
  studentDateOfBirth: string;
  
  // Service selection
  serviceType: 'preschool' | 'learning_center' | 'both';
  
  // Learning Center
  selectedSubjects: string[];
  intensityHoursPerWeek: number;
  preferredSchedule: string;
  
  // Preschool
  preschoolLevel: 'nursery' | 'maternal' | 'prekinder' | 'kinder';
  
  // Documents (file references)
  documents: {
    type: PreschoolDocument['document_type'];
    file: File | null;
  }[];
}
