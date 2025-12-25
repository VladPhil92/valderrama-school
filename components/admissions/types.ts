// ============================================
// ADMISSION FORM TYPES
// ============================================

// Common types
export type FormType = 'school' | 'learning-center';

export interface FormStep {
  id: string;
  section: string;
  sectionLabel: string;
  question: string;
  description?: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'multi-select';
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  conditionalOn?: { field: string; value: string | string[] };
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// ============================================
// SCHOOL ADMISSION FORM (Preschool)
// ============================================

export interface SchoolStudentData {
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  currentAge: string;
  aspiringLevel: 'nursery' | 'maternal' | 'prekinder' | 'kinder';
  schoolYear: string;
}

export interface SchoolGuardianData {
  fullName: string;
  documentId: string;
  relationship: string;
  phone: string;
  email: string;
  address?: string;
}

export interface SchoolFamilyInfo {
  livingWith: string;
  hasSiblings: 'yes' | 'no';
  siblingsAtSchool: 'yes' | 'no';
}

export interface SchoolPreviousEducation {
  hasPreviousEducation: 'yes' | 'no';
  institutionName?: string;
  timeAttended?: string;
  observations?: string;
}

export interface SchoolHealthInfo {
  hasMedicalCondition: 'yes' | 'no';
  medicalConditionDetails?: string;
  hasAllergies: 'yes' | 'no';
  allergyTypes?: string[];
  allergyDetails?: string;
  requiresMedication: 'yes' | 'no';
  medicationDetails?: string;
  bloodType?: string;
  hasTherapySupport: 'yes' | 'no';
  therapyDetails?: string;
  hasDevelopmentCondition: 'yes' | 'no';
  developmentDetails?: string;
  dietaryRestrictions: string[];
  foodsToAvoid?: string;
  lunchRecommendations?: string;
}

export interface SchoolHabits {
  sphincterControl: string;
  autonomyLevel: string;
  importantRoutines?: string;
}

export interface SchoolMotivation {
  whyThisSchool: string;
  expectations: string;
}

export interface SchoolAuthorizations {
  dataProcessing: boolean;
  emergencyAttention: boolean;
  truthfulInfo: boolean;
  guardianName: string;
  date: string;
}

export interface SchoolAdmissionForm {
  formType: 'school';
  studentData: SchoolStudentData;
  primaryGuardian: SchoolGuardianData;
  secondaryGuardian: Partial<SchoolGuardianData>;
  familyInfo: SchoolFamilyInfo;
  previousEducation: SchoolPreviousEducation;
  healthInfo: SchoolHealthInfo;
  habits: SchoolHabits;
  motivation: SchoolMotivation;
  authorizations: SchoolAuthorizations;
}

// ============================================
// LEARNING CENTER FORM
// ============================================

export interface LearningCenterStudentData {
  fullName: string;
  age: string;
  documentId?: string;
  guardianName: string;
  phone: string;
  email: string;
}

export type ServiceType = 'tutoring' | 'languages' | 'music' | 'art' | 'sports';

export interface LearningCenterServiceSelection {
  serviceType: ServiceType;
  languageOptions?: string[];
  musicOptions?: string[];
  artOptions?: string[];
  sportsOptions?: string[];
}

export interface LearningCenterExperience {
  hasPreviousExperience: 'yes' | 'no';
  approximateLevel?: string;
  previousInstitution?: string;
  difficultiesOrInterests?: string;
}

export interface LearningCenterObjectives {
  goals: string;
  specificObjective?: string;
}

export interface LearningCenterHealthInfo {
  hasMedicalCondition: 'yes' | 'no';
  medicalConditionDetails?: string;
  hasAllergies: 'yes' | 'no';
  allergyDetails?: string;
  requiresMedication: 'yes' | 'no';
  medicationDetails?: string;
  hasPhysicalLimitation: 'yes' | 'no';
  physicalLimitationDetails?: string;
  hasMedicalClearance: 'yes' | 'no' | 'not-applicable';
  instructorNotes?: string;
  hasDietaryRestrictions: 'yes' | 'no';
  dietaryDetails?: string;
  foodsToAvoid?: string;
  dietaryRecommendations?: string;
}

export interface LearningCenterObservations {
  additionalInfo?: string;
}

export interface LearningCenterConsents {
  dataProcessing: boolean;
  participationAuthorization: boolean;
  guardianName: string;
  date: string;
}

export interface LearningCenterForm {
  formType: 'learning-center';
  studentData: LearningCenterStudentData;
  serviceSelection: LearningCenterServiceSelection;
  experience: LearningCenterExperience;
  objectives: LearningCenterObjectives;
  healthInfo: LearningCenterHealthInfo;
  observations: LearningCenterObservations;
  consents: LearningCenterConsents;
}

// Union type for both forms
export type AdmissionFormData = SchoolAdmissionForm | LearningCenterForm;

// Form state
export interface FormState {
  currentStep: number;
  totalSteps: number;
  currentSection: string;
  data: Record<string, unknown>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isComplete: boolean;
}
