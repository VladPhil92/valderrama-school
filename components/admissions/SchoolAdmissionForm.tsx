'use client';

import { useState } from 'react';
import { User, Users, Home, BookOpen, Heart, Baby, Sparkles, FileCheck } from 'lucide-react';
import AdmissionProgressBar from './ProgressBar';
import {
  TextInputStep,
  TextareaStep,
  RadioStep,
  CheckboxStep,
  SelectStep,
  ConfirmationStep,
  NavigationButtons,
  FormStepWrapper,
} from './FormSteps';

// Define all steps for the school form
const SCHOOL_SECTIONS = [
  { id: 'A', label: 'Estudiante', icon: <User size={18} className="text-[#C41E3A]" /> },
  { id: 'B', label: 'Acudientes', icon: <Users size={18} className="text-[#C41E3A]" /> },
  { id: 'C', label: 'Familia', icon: <Home size={18} className="text-[#C41E3A]" /> },
  { id: 'D', label: 'Educación', icon: <BookOpen size={18} className="text-[#C41E3A]" /> },
  { id: 'E', label: 'Salud', icon: <Heart size={18} className="text-[#C41E3A]" /> },
  { id: 'F', label: 'Hábitos', icon: <Baby size={18} className="text-[#C41E3A]" /> },
  { id: 'G', label: 'Motivación', icon: <Sparkles size={18} className="text-[#C41E3A]" /> },
  { id: 'H', label: 'Autorización', icon: <FileCheck size={18} className="text-[#C41E3A]" /> },
];

// All steps in the form with their section
const FORM_STEPS = [
  // Section A - Student Data
  { section: 'A', field: 'studentFullName' },
  { section: 'A', field: 'studentDocumentType' },
  { section: 'A', field: 'studentDocumentNumber' },
  { section: 'A', field: 'studentBirthDate' },
  { section: 'A', field: 'aspiringLevel' },
  { section: 'A', field: 'schoolYear' },
  // Section B - Guardians
  { section: 'B', field: 'primaryGuardianName' },
  { section: 'B', field: 'primaryGuardianDocument' },
  { section: 'B', field: 'primaryGuardianRelationship' },
  { section: 'B', field: 'primaryGuardianPhone' },
  { section: 'B', field: 'primaryGuardianEmail' },
  { section: 'B', field: 'primaryGuardianAddress' },
  { section: 'B', field: 'hasSecondaryGuardian' },
  { section: 'B', field: 'secondaryGuardianName', conditional: { field: 'hasSecondaryGuardian', value: 'yes' } },
  { section: 'B', field: 'secondaryGuardianDocument', conditional: { field: 'hasSecondaryGuardian', value: 'yes' } },
  { section: 'B', field: 'secondaryGuardianRelationship', conditional: { field: 'hasSecondaryGuardian', value: 'yes' } },
  { section: 'B', field: 'secondaryGuardianPhone', conditional: { field: 'hasSecondaryGuardian', value: 'yes' } },
  { section: 'B', field: 'secondaryGuardianEmail', conditional: { field: 'hasSecondaryGuardian', value: 'yes' } },
  // Section C - Family Info
  { section: 'C', field: 'livingWith' },
  { section: 'C', field: 'hasSiblings' },
  { section: 'C', field: 'siblingsAtSchool', conditional: { field: 'hasSiblings', value: 'yes' } },
  // Section D - Previous Education
  { section: 'D', field: 'hasPreviousEducation' },
  { section: 'D', field: 'previousInstitutionName', conditional: { field: 'hasPreviousEducation', value: 'yes' } },
  { section: 'D', field: 'previousTimeAttended', conditional: { field: 'hasPreviousEducation', value: 'yes' } },
  { section: 'D', field: 'previousObservations', conditional: { field: 'hasPreviousEducation', value: 'yes' } },
  // Section E - Health
  { section: 'E', field: 'hasMedicalCondition' },
  { section: 'E', field: 'medicalConditionDetails', conditional: { field: 'hasMedicalCondition', value: 'yes' } },
  { section: 'E', field: 'hasAllergies' },
  { section: 'E', field: 'allergyTypes', conditional: { field: 'hasAllergies', value: 'yes' } },
  { section: 'E', field: 'allergyDetails', conditional: { field: 'hasAllergies', value: 'yes' } },
  { section: 'E', field: 'requiresMedication' },
  { section: 'E', field: 'medicationDetails', conditional: { field: 'requiresMedication', value: 'yes' } },
  { section: 'E', field: 'bloodType' },
  { section: 'E', field: 'hasTherapySupport' },
  { section: 'E', field: 'therapyDetails', conditional: { field: 'hasTherapySupport', value: 'yes' } },
  { section: 'E', field: 'hasDevelopmentCondition' },
  { section: 'E', field: 'developmentDetails', conditional: { field: 'hasDevelopmentCondition', value: 'yes' } },
  { section: 'E', field: 'dietaryRestrictions' },
  { section: 'E', field: 'foodsToAvoid' },
  { section: 'E', field: 'lunchRecommendations' },
  // Section F - Habits
  { section: 'F', field: 'sphincterControl' },
  { section: 'F', field: 'autonomyLevel' },
  { section: 'F', field: 'importantRoutines' },
  // Section G - Motivation
  { section: 'G', field: 'whyThisSchool' },
  { section: 'G', field: 'expectations' },
  // Section H - Authorizations
  { section: 'H', field: 'authorizations' },
  { section: 'H', field: 'guardianSignatureName' },
  { section: 'H', field: 'signatureDate' },
];

interface SchoolAdmissionFormProps {
  locale: string;
  onComplete?: (data: Record<string, unknown>) => void;
}

export default function SchoolAdmissionForm({ locale: _locale, onComplete }: SchoolAdmissionFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter steps based on conditions
  const activeSteps = FORM_STEPS.filter((step) => {
    if (!step.conditional) return true;
    const conditionValue = formData[step.conditional.field];
    return conditionValue === step.conditional.value;
  });

  const totalSteps = activeSteps.length;
  const currentStepData = activeSteps[currentStep];
  const currentSection = currentStepData?.section || 'A';
  const isLastStep = currentStep === totalSteps - 1;

  // Update form data
  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate current step
  const validateStep = (): boolean => {
    const field = currentStepData?.field;
    if (!field) return true;

    // Define required fields
    const requiredFields = [
      'studentFullName', 'studentBirthDate', 'aspiringLevel', 'schoolYear',
      'primaryGuardianName', 'primaryGuardianPhone', 'primaryGuardianEmail',
      'livingWith', 'hasSiblings', 'hasPreviousEducation',
      'hasMedicalCondition', 'hasAllergies', 'requiresMedication', 'dietaryRestrictions',
      'sphincterControl', 'autonomyLevel',
      'whyThisSchool', 'expectations',
      'authorizations', 'guardianSignatureName', 'signatureDate',
    ];

    if (requiredFields.includes(field)) {
      const value = formData[field];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        setErrors({ [field]: 'Este campo es obligatorio' });
        return false;
      }
      
      // Special validation for authorizations
      if (field === 'authorizations') {
        const auths = value as Record<string, boolean>;
        if (!auths.dataProcessing || !auths.emergencyAttention || !auths.truthfulInfo) {
          setErrors({ [field]: 'Debe aceptar todas las autorizaciones obligatorias' });
          return false;
        }
      }
    }

    // Email validation
    if (field.includes('Email') && formData[field]) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData[field] as string)) {
        setErrors({ [field]: 'Ingrese un correo electrónico válido' });
        return false;
      }
    }

    return true;
  };

  // Navigation
  const goNext = () => {
    if (!validateStep()) return;
    
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Submit form
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would send the data to your backend
      console.log('Form submitted:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      onComplete?.(formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    const field = currentStepData?.field;
    if (!field) return null;

    switch (field) {
      // Section A - Student Data
      case 'studentFullName':
        return (
          <TextInputStep
            label="Nombres y apellidos completos del estudiante"
            description="Ingrese el nombre completo tal como aparece en el documento de identidad"
            value={(formData.studentFullName as string) || ''}
            onChange={(v) => updateField('studentFullName', v)}
            placeholder="Ej: María José García López"
            required
            error={errors.studentFullName}
          />
        );

      case 'studentDocumentType':
        return (
          <RadioStep
            label="Tipo de documento de identidad"
            description="Seleccione el tipo de documento (si aplica)"
            options={[
              { value: 'tarjeta_identidad', label: 'Tarjeta de Identidad' },
              { value: 'registro_civil', label: 'Registro Civil' },
              { value: 'pasaporte', label: 'Pasaporte' },
              { value: 'no_aplica', label: 'No aplica / No tiene aún' },
            ]}
            value={(formData.studentDocumentType as string) || ''}
            onChange={(v) => updateField('studentDocumentType', v)}
            columns={2}
          />
        );

      case 'studentDocumentNumber':
        return (
          <TextInputStep
            label="Número de documento"
            description="Ingrese el número de documento (si aplica)"
            value={(formData.studentDocumentNumber as string) || ''}
            onChange={(v) => updateField('studentDocumentNumber', v)}
            placeholder="Ej: 1234567890"
          />
        );

      case 'studentBirthDate':
        return (
          <TextInputStep
            label="Fecha de nacimiento"
            description="Seleccione la fecha de nacimiento del estudiante"
            type="date"
            value={(formData.studentBirthDate as string) || ''}
            onChange={(v) => updateField('studentBirthDate', v)}
            required
            error={errors.studentBirthDate}
          />
        );

      case 'aspiringLevel':
        return (
          <RadioStep
            label="¿A qué nivel aspira ingresar?"
            description="Seleccione el nivel de educación inicial"
            options={[
              { value: 'nursery', label: 'Nursery', description: '1-2 años' },
              { value: 'maternal', label: 'Maternal', description: '2-3 años' },
              { value: 'prekinder', label: 'Prekínder', description: '3-4 años' },
              { value: 'kinder', label: 'Kínder', description: '4-5 años' },
            ]}
            value={(formData.aspiringLevel as string) || ''}
            onChange={(v) => updateField('aspiringLevel', v)}
            columns={2}
            required
            error={errors.aspiringLevel}
          />
        );

      case 'schoolYear':
        return (
          <SelectStep
            label="Año lectivo de ingreso"
            description="¿Para qué año escolar desea inscribir al estudiante?"
            options={[
              { value: '2025-2026', label: '2025-2026' },
              { value: '2026-2027', label: '2026-2027' },
            ]}
            value={(formData.schoolYear as string) || ''}
            onChange={(v) => updateField('schoolYear', v)}
            required
            error={errors.schoolYear}
          />
        );

      // Section B - Primary Guardian
      case 'primaryGuardianName':
        return (
          <TextInputStep
            label="Nombre completo del acudiente principal"
            value={(formData.primaryGuardianName as string) || ''}
            onChange={(v) => updateField('primaryGuardianName', v)}
            placeholder="Ej: Carlos García Mendoza"
            required
            error={errors.primaryGuardianName}
          />
        );

      case 'primaryGuardianDocument':
        return (
          <TextInputStep
            label="Documento de identidad del acudiente principal"
            value={(formData.primaryGuardianDocument as string) || ''}
            onChange={(v) => updateField('primaryGuardianDocument', v)}
            placeholder="Ej: CC 12345678"
          />
        );

      case 'primaryGuardianRelationship':
        return (
          <RadioStep
            label="Parentesco con el estudiante"
            options={[
              { value: 'madre', label: 'Madre' },
              { value: 'padre', label: 'Padre' },
              { value: 'abuelo_a', label: 'Abuelo/a' },
              { value: 'tio_a', label: 'Tío/a' },
              { value: 'otro', label: 'Otro' },
            ]}
            value={(formData.primaryGuardianRelationship as string) || ''}
            onChange={(v) => updateField('primaryGuardianRelationship', v)}
            columns={3}
          />
        );

      case 'primaryGuardianPhone':
        return (
          <TextInputStep
            label="Teléfono de contacto"
            type="tel"
            value={(formData.primaryGuardianPhone as string) || ''}
            onChange={(v) => updateField('primaryGuardianPhone', v)}
            placeholder="Ej: +57 318 123 4567"
            required
            error={errors.primaryGuardianPhone}
          />
        );

      case 'primaryGuardianEmail':
        return (
          <TextInputStep
            label="Correo electrónico"
            type="email"
            value={(formData.primaryGuardianEmail as string) || ''}
            onChange={(v) => updateField('primaryGuardianEmail', v)}
            placeholder="Ej: correo@ejemplo.com"
            required
            error={errors.primaryGuardianEmail}
          />
        );

      case 'primaryGuardianAddress':
        return (
          <TextInputStep
            label="Dirección de residencia"
            value={(formData.primaryGuardianAddress as string) || ''}
            onChange={(v) => updateField('primaryGuardianAddress', v)}
            placeholder="Ej: Calle 5 #8-82, Barrio Castillogrande"
          />
        );

      case 'hasSecondaryGuardian':
        return (
          <RadioStep
            label="¿Desea registrar un acudiente secundario?"
            description="Un segundo contacto autorizado para emergencias"
            options={[
              { value: 'yes', label: 'Sí, agregar acudiente secundario' },
              { value: 'no', label: 'No, continuar sin acudiente secundario' },
            ]}
            value={(formData.hasSecondaryGuardian as string) || ''}
            onChange={(v) => updateField('hasSecondaryGuardian', v)}
          />
        );

      case 'secondaryGuardianName':
        return (
          <TextInputStep
            label="Nombre completo del acudiente secundario"
            value={(formData.secondaryGuardianName as string) || ''}
            onChange={(v) => updateField('secondaryGuardianName', v)}
            placeholder="Ej: Ana María López"
          />
        );

      case 'secondaryGuardianDocument':
        return (
          <TextInputStep
            label="Documento del acudiente secundario"
            value={(formData.secondaryGuardianDocument as string) || ''}
            onChange={(v) => updateField('secondaryGuardianDocument', v)}
          />
        );

      case 'secondaryGuardianRelationship':
        return (
          <RadioStep
            label="Parentesco del acudiente secundario"
            options={[
              { value: 'madre', label: 'Madre' },
              { value: 'padre', label: 'Padre' },
              { value: 'abuelo_a', label: 'Abuelo/a' },
              { value: 'tio_a', label: 'Tío/a' },
              { value: 'otro', label: 'Otro' },
            ]}
            value={(formData.secondaryGuardianRelationship as string) || ''}
            onChange={(v) => updateField('secondaryGuardianRelationship', v)}
            columns={3}
          />
        );

      case 'secondaryGuardianPhone':
        return (
          <TextInputStep
            label="Teléfono del acudiente secundario"
            type="tel"
            value={(formData.secondaryGuardianPhone as string) || ''}
            onChange={(v) => updateField('secondaryGuardianPhone', v)}
          />
        );

      case 'secondaryGuardianEmail':
        return (
          <TextInputStep
            label="Correo electrónico del acudiente secundario"
            type="email"
            value={(formData.secondaryGuardianEmail as string) || ''}
            onChange={(v) => updateField('secondaryGuardianEmail', v)}
          />
        );

      // Section C - Family Info
      case 'livingWith':
        return (
          <RadioStep
            label="¿Con quién vive el estudiante actualmente?"
            options={[
              { value: 'ambos_padres', label: 'Ambos padres' },
              { value: 'solo_madre', label: 'Solo con la madre' },
              { value: 'solo_padre', label: 'Solo con el padre' },
              { value: 'abuelos', label: 'Con abuelos' },
              { value: 'otro_familiar', label: 'Otro familiar' },
            ]}
            value={(formData.livingWith as string) || ''}
            onChange={(v) => updateField('livingWith', v)}
            required
            error={errors.livingWith}
          />
        );

      case 'hasSiblings':
        return (
          <RadioStep
            label="¿El estudiante tiene hermanos?"
            options={[
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No' },
            ]}
            value={(formData.hasSiblings as string) || ''}
            onChange={(v) => updateField('hasSiblings', v)}
            required
            error={errors.hasSiblings}
          />
        );

      case 'siblingsAtSchool':
        return (
          <RadioStep
            label="¿Algún hermano estudia o ha estudiado en el colegio?"
            options={[
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No' },
            ]}
            value={(formData.siblingsAtSchool as string) || ''}
            onChange={(v) => updateField('siblingsAtSchool', v)}
          />
        );

      // Section D - Previous Education
      case 'hasPreviousEducation':
        return (
          <RadioStep
            label="¿El estudiante ha asistido anteriormente a guardería, jardín o colegio?"
            options={[
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No, es su primera experiencia educativa' },
            ]}
            value={(formData.hasPreviousEducation as string) || ''}
            onChange={(v) => updateField('hasPreviousEducation', v)}
            required
            error={errors.hasPreviousEducation}
          />
        );

      case 'previousInstitutionName':
        return (
          <TextInputStep
            label="Nombre de la institución anterior"
            value={(formData.previousInstitutionName as string) || ''}
            onChange={(v) => updateField('previousInstitutionName', v)}
            placeholder="Ej: Jardín Infantil Pequeños Gigantes"
          />
        );

      case 'previousTimeAttended':
        return (
          <TextInputStep
            label="Tiempo de permanencia"
            description="¿Cuánto tiempo asistió a la institución anterior?"
            value={(formData.previousTimeAttended as string) || ''}
            onChange={(v) => updateField('previousTimeAttended', v)}
            placeholder="Ej: 1 año, 6 meses"
          />
        );

      case 'previousObservations':
        return (
          <TextareaStep
            label="Observaciones sobre adaptación y socialización"
            description="Cuéntenos cómo fue su experiencia en la institución anterior"
            value={(formData.previousObservations as string) || ''}
            onChange={(v) => updateField('previousObservations', v)}
            placeholder="Ej: Se adaptó bien, le gustaba jugar con otros niños..."
          />
        );

      // Section E - Health
      case 'hasMedicalCondition':
        return (
          <RadioStep
            label="¿El estudiante presenta alguna condición médica diagnosticada?"
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Sí (especificar)' },
            ]}
            value={(formData.hasMedicalCondition as string) || ''}
            onChange={(v) => updateField('hasMedicalCondition', v)}
            required
            error={errors.hasMedicalCondition}
          />
        );

      case 'medicalConditionDetails':
        return (
          <TextareaStep
            label="Por favor describa la condición médica"
            value={(formData.medicalConditionDetails as string) || ''}
            onChange={(v) => updateField('medicalConditionDetails', v)}
            placeholder="Describa la condición, tratamientos y cuidados necesarios..."
          />
        );

      case 'hasAllergies':
        return (
          <RadioStep
            label="¿El estudiante tiene alergias?"
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Sí' },
            ]}
            value={(formData.hasAllergies as string) || ''}
            onChange={(v) => updateField('hasAllergies', v)}
            required
            error={errors.hasAllergies}
          />
        );

      case 'allergyTypes':
        return (
          <CheckboxStep
            label="¿Qué tipo de alergias presenta?"
            description="Seleccione todas las que apliquen"
            options={[
              { value: 'alimentarias', label: 'Alergias alimentarias' },
              { value: 'ambientales', label: 'Alergias ambientales (polvo, polen, etc.)' },
              { value: 'medicamentos', label: 'Alergias a medicamentos' },
              { value: 'picaduras', label: 'Alergias a picaduras de insectos' },
              { value: 'otras', label: 'Otras' },
            ]}
            values={(formData.allergyTypes as string[]) || []}
            onChange={(v) => updateField('allergyTypes', v)}
          />
        );

      case 'allergyDetails':
        return (
          <TextareaStep
            label="Detalles de las alergias"
            description="Por favor especifique a qué es alérgico y las reacciones que presenta"
            value={(formData.allergyDetails as string) || ''}
            onChange={(v) => updateField('allergyDetails', v)}
            placeholder="Ej: Alérgico al maní, presenta urticaria..."
          />
        );

      case 'requiresMedication':
        return (
          <RadioStep
            label="¿El estudiante requiere medicación permanente?"
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Sí (indicar dosis y horarios)' },
            ]}
            value={(formData.requiresMedication as string) || ''}
            onChange={(v) => updateField('requiresMedication', v)}
            required
            error={errors.requiresMedication}
          />
        );

      case 'medicationDetails':
        return (
          <TextareaStep
            label="Información sobre medicación"
            description="Indique el nombre del medicamento, dosis y horarios de administración"
            value={(formData.medicationDetails as string) || ''}
            onChange={(v) => updateField('medicationDetails', v)}
            placeholder="Ej: Medicamento X, 5ml cada 8 horas..."
          />
        );

      case 'bloodType':
        return (
          <SelectStep
            label="Grupo sanguíneo"
            description="Si conoce el tipo de sangre del estudiante"
            options={[
              { value: 'unknown', label: 'No lo sé' },
              { value: 'O+', label: 'O+' },
              { value: 'O-', label: 'O-' },
              { value: 'A+', label: 'A+' },
              { value: 'A-', label: 'A-' },
              { value: 'B+', label: 'B+' },
              { value: 'B-', label: 'B-' },
              { value: 'AB+', label: 'AB+' },
              { value: 'AB-', label: 'AB-' },
            ]}
            value={(formData.bloodType as string) || ''}
            onChange={(v) => updateField('bloodType', v)}
          />
        );

      case 'hasTherapySupport':
        return (
          <RadioStep
            label="¿El estudiante ha recibido acompañamiento médico, terapéutico o psicológico?"
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Sí' },
            ]}
            value={(formData.hasTherapySupport as string) || ''}
            onChange={(v) => updateField('hasTherapySupport', v)}
          />
        );

      case 'therapyDetails':
        return (
          <TextareaStep
            label="Describa el tipo de acompañamiento recibido"
            value={(formData.therapyDetails as string) || ''}
            onChange={(v) => updateField('therapyDetails', v)}
            placeholder="Ej: Terapia de lenguaje durante 6 meses..."
          />
        );

      case 'hasDevelopmentCondition':
        return (
          <RadioStep
            label="¿El estudiante presenta alguna condición del desarrollo que debamos conocer?"
            options={[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Sí' },
            ]}
            value={(formData.hasDevelopmentCondition as string) || ''}
            onChange={(v) => updateField('hasDevelopmentCondition', v)}
          />
        );

      case 'developmentDetails':
        return (
          <TextareaStep
            label="Por favor describa la condición del desarrollo"
            value={(formData.developmentDetails as string) || ''}
            onChange={(v) => updateField('developmentDetails', v)}
            placeholder="Describa la condición y las recomendaciones de especialistas..."
          />
        );

      case 'dietaryRestrictions':
        return (
          <CheckboxStep
            label="¿El estudiante tiene restricciones alimentarias?"
            description="Seleccione todas las que apliquen"
            options={[
              { value: 'ninguna', label: 'Ninguna restricción' },
              { value: 'intolerancias', label: 'Intolerancias (lactosa, gluten, etc.)' },
              { value: 'alergias', label: 'Alergias alimentarias' },
              { value: 'religiosas', label: 'Restricciones culturales o religiosas' },
              { value: 'vegetariano', label: 'Dieta vegetariana' },
              { value: 'vegano', label: 'Dieta vegana' },
            ]}
            values={(formData.dietaryRestrictions as string[]) || []}
            onChange={(v) => updateField('dietaryRestrictions', v)}
            columns={2}
            required
            error={errors.dietaryRestrictions}
          />
        );

      case 'foodsToAvoid':
        return (
          <TextareaStep
            label="Alimentos que NO puede consumir"
            description="Liste los alimentos específicos que debe evitar"
            value={(formData.foodsToAvoid as string) || ''}
            onChange={(v) => updateField('foodsToAvoid', v)}
            placeholder="Ej: Leche, queso, mariscos..."
          />
        );

      case 'lunchRecommendations':
        return (
          <TextareaStep
            label="Recomendaciones para lonchera o alimentación escolar"
            value={(formData.lunchRecommendations as string) || ''}
            onChange={(v) => updateField('lunchRecommendations', v)}
            placeholder="Ej: Prefiere frutas, evitar alimentos muy condimentados..."
          />
        );

      // Section F - Habits
      case 'sphincterControl':
        return (
          <RadioStep
            label="Control de esfínteres"
            description="¿El estudiante tiene control de esfínteres?"
            options={[
              { value: 'completo', label: 'Control completo (día y noche)' },
              { value: 'diurno', label: 'Control solo durante el día' },
              { value: 'en_proceso', label: 'En proceso de entrenamiento' },
              { value: 'usa_panal', label: 'Usa pañal' },
            ]}
            value={(formData.sphincterControl as string) || ''}
            onChange={(v) => updateField('sphincterControl', v)}
            required
            error={errors.sphincterControl}
          />
        );

      case 'autonomyLevel':
        return (
          <RadioStep
            label="Nivel de autonomía"
            description="¿Qué tan independiente es el estudiante en actividades básicas?"
            options={[
              { value: 'alto', label: 'Alta autonomía', description: 'Come, se viste y va al baño solo' },
              { value: 'medio', label: 'Autonomía media', description: 'Necesita ayuda ocasional' },
              { value: 'bajo', label: 'Requiere asistencia', description: 'Necesita ayuda frecuente' },
            ]}
            value={(formData.autonomyLevel as string) || ''}
            onChange={(v) => updateField('autonomyLevel', v)}
            required
            error={errors.autonomyLevel}
          />
        );

      case 'importantRoutines':
        return (
          <TextareaStep
            label="Rutinas importantes que debamos conocer"
            description="Hábitos de sueño, siesta, alimentación u otros"
            value={(formData.importantRoutines as string) || ''}
            onChange={(v) => updateField('importantRoutines', v)}
            placeholder="Ej: Toma siesta después del almuerzo, tiene objeto de apego..."
          />
        );

      // Section G - Motivation
      case 'whyThisSchool':
        return (
          <TextareaStep
            label="¿Por qué eligieron este colegio para su hijo(a)?"
            description="Cuéntenos qué los motivó a elegir Valderrama International School"
            value={(formData.whyThisSchool as string) || ''}
            onChange={(v) => updateField('whyThisSchool', v)}
            placeholder="Ej: Por su enfoque bilingüe, metodología de aprendizaje..."
            required
            error={errors.whyThisSchool}
          />
        );

      case 'expectations':
        return (
          <TextareaStep
            label="¿Qué esperan del proceso formativo en esta etapa inicial?"
            description="Comparta sus expectativas y objetivos para su hijo(a)"
            value={(formData.expectations as string) || ''}
            onChange={(v) => updateField('expectations', v)}
            placeholder="Ej: Que desarrolle habilidades sociales, que aprenda inglés..."
            required
            error={errors.expectations}
          />
        );

      // Section H - Authorizations
      case 'authorizations':
        return (
          <ConfirmationStep
            label="Autorizaciones y declaraciones"
            description="Por favor lea y acepte las siguientes autorizaciones"
            items={[
              {
                key: 'dataProcessing',
                label: 'Autorizo el tratamiento de datos personales de acuerdo con la política de privacidad del colegio.',
                required: true,
              },
              {
                key: 'emergencyAttention',
                label: 'Autorizo la atención básica de primeros auxilios en caso de emergencia.',
                required: true,
              },
              {
                key: 'truthfulInfo',
                label: 'Declaro que la información suministrada en este formulario es veraz y completa.',
                required: true,
              },
            ]}
            values={(formData.authorizations as Record<string, boolean>) || {}}
            onChange={(key, value) => {
              const current = (formData.authorizations as Record<string, boolean>) || {};
              updateField('authorizations', { ...current, [key]: value });
            }}
            error={errors.authorizations}
          />
        );

      case 'guardianSignatureName':
        return (
          <TextInputStep
            label="Nombre completo del acudiente (firma)"
            description="Este nombre servirá como firma electrónica"
            value={(formData.guardianSignatureName as string) || ''}
            onChange={(v) => updateField('guardianSignatureName', v)}
            required
            error={errors.guardianSignatureName}
          />
        );

      case 'signatureDate':
        return (
          <TextInputStep
            label="Fecha"
            type="date"
            value={(formData.signatureDate as string) || new Date().toISOString().split('T')[0]}
            onChange={(v) => updateField('signatureDate', v)}
            required
            error={errors.signatureDate}
          />
        );

      default:
        return null;
    }
  };

  // Get section icon
  const getSectionIcon = () => {
    const section = SCHOOL_SECTIONS.find((s) => s.id === currentSection);
    return section?.icon;
  };

  // Get section label
  const getSectionLabel = () => {
    const section = SCHOOL_SECTIONS.find((s) => s.id === currentSection);
    return section ? `Sección ${section.id}: ${section.label}` : '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 bg-[#C41E3A]/10 text-[#C41E3A] text-xs uppercase tracking-wider rounded-full mb-4">
          Educación Inicial / Preescolar
        </span>
        <h1 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2">
          Formulario de Admisión
        </h1>
        <p className="text-slate-500 text-sm">
          Niveles: Nursery · Maternal · Prekínder · Kínder
        </p>
      </div>

      {/* Progress Bar */}
      <AdmissionProgressBar
        currentStep={currentStep + 1}
        totalSteps={totalSteps}
        sections={SCHOOL_SECTIONS}
        currentSection={currentSection}
      />

      {/* Form Content */}
      <FormStepWrapper
        sectionTitle={getSectionLabel()}
        sectionIcon={getSectionIcon()}
      >
        {renderStepContent()}
        
        <NavigationButtons
          onBack={goBack}
          onNext={goNext}
          showBack={currentStep > 0}
          isLastStep={isLastStep}
          nextLabel={isLastStep ? 'Enviar solicitud' : 'Continuar'}
          isSubmitting={isSubmitting}
        />
      </FormStepWrapper>
    </div>
  );
}
