'use client';

import { useState } from 'react';
import { 
  LearningCenterStudentData,
  LearningCenterServiceSelection,
  LearningCenterExperience,
  LearningCenterObjectives,
  LearningCenterHealthInfo,
  LearningCenterObservations,
  LearningCenterConsents,
  ServiceType,
} from './types';
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

// Define sections for the form
const SECTIONS = [
  { id: 'A', label: 'Student' },
  { id: 'B', label: 'Service' },
  { id: 'C', label: 'Experience' },
  { id: 'D', label: 'Goals' },
  { id: 'E', label: 'Health' },
  { id: 'F', label: 'Notes' },
  { id: 'G', label: 'Consent' },
];

// Total steps per section
const STEPS_PER_SECTION: Record<string, number> = {
  A: 5, // Student data
  B: 5, // Service selection with conditional details
  C: 3, // Experience
  D: 2, // Objectives
  E: 6, // Health
  F: 1, // Observations
  G: 3, // Consents
};

const TOTAL_STEPS = Object.values(STEPS_PER_SECTION).reduce((a, b) => a + b, 0);

// Service type options
const serviceTypeOptions = [
  { value: 'tutoring', label: 'Academic Tutoring', description: 'Support in school subjects' },
  { value: 'languages', label: 'Language Courses', description: 'Learn new languages' },
  { value: 'music', label: 'Music Classes', description: 'Learn instruments or voice' },
  { value: 'art', label: 'Art Classes', description: 'Painting, drawing, sculpture' },
  { value: 'sports', label: 'Sports Programs', description: 'Physical activities and sports' },
];

// Language options
const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'german', label: 'German' },
];

// Music options
const musicOptions = [
  { value: 'piano', label: 'Piano' },
  { value: 'guitar', label: 'Guitar' },
  { value: 'violin', label: 'Violin' },
  { value: 'drums', label: 'Drums' },
  { value: 'voice', label: 'Voice/Singing' },
  { value: 'other', label: 'Other Instrument' },
];

// Art options
const artOptions = [
  { value: 'painting', label: 'Painting' },
  { value: 'drawing', label: 'Drawing' },
  { value: 'sculpture', label: 'Sculpture' },
  { value: 'digital', label: 'Digital Art' },
  { value: 'crafts', label: 'Crafts' },
];

// Sports options
const sportsOptions = [
  { value: 'soccer', label: 'Soccer' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'martial_arts', label: 'Martial Arts' },
  { value: 'dance', label: 'Dance' },
];

// Yes/No options
const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export function LearningCenterAdmissionForm() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form data state matching the types
  const [studentData, setStudentData] = useState<LearningCenterStudentData>({
    fullName: '',
    age: '',
    documentId: '',
    guardianName: '',
    phone: '',
    email: '',
  });
  
  const [serviceSelection, setServiceSelection] = useState<LearningCenterServiceSelection>({
    serviceType: 'tutoring',
    languageOptions: [],
    musicOptions: [],
    artOptions: [],
    sportsOptions: [],
  });
  
  const [experience, setExperience] = useState<LearningCenterExperience>({
    hasPreviousExperience: 'no',
    approximateLevel: '',
    previousInstitution: '',
    difficultiesOrInterests: '',
  });
  
  const [objectives, setObjectives] = useState<LearningCenterObjectives>({
    goals: '',
    specificObjective: '',
  });
  
  const [healthInfo, setHealthInfo] = useState<LearningCenterHealthInfo>({
    hasMedicalCondition: 'no',
    medicalConditionDetails: '',
    hasAllergies: 'no',
    allergyDetails: '',
    requiresMedication: 'no',
    medicationDetails: '',
    hasPhysicalLimitation: 'no',
    physicalLimitationDetails: '',
    hasMedicalClearance: 'not-applicable',
    instructorNotes: '',
    hasDietaryRestrictions: 'no',
    dietaryDetails: '',
    foodsToAvoid: '',
    dietaryRecommendations: '',
  });
  
  const [observations, setObservations] = useState<LearningCenterObservations>({
    additionalInfo: '',
  });
  
  const [consents, setConsents] = useState<LearningCenterConsents>({
    dataProcessing: false,
    participationAuthorization: false,
    guardianName: '',
    date: '',
  });

  // Calculate overall progress
  const getSectionStartStep = (sectionIndex: number): number => {
    let step = 0;
    for (let i = 0; i < sectionIndex; i++) {
      step += STEPS_PER_SECTION[SECTIONS[i].id];
    }
    return step;
  };

  const currentOverallStep = getSectionStartStep(currentSection) + currentStep + 1;
  const currentSectionId = SECTIONS[currentSection].id;

  // Navigation
  const goToNextStep = () => {
    const maxStepsInSection = STEPS_PER_SECTION[currentSectionId];
    if (currentStep < maxStepsInSection - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(0);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentSection > 0) {
      const prevSection = currentSection - 1;
      const prevSectionId = SECTIONS[prevSection].id;
      setCurrentSection(prevSection);
      setCurrentStep(STEPS_PER_SECTION[prevSectionId] - 1);
    }
  };

  const isFirstStep = currentSection === 0 && currentStep === 0;
  const isLastStep = currentSection === SECTIONS.length - 1 && 
                     currentStep === STEPS_PER_SECTION[currentSectionId] - 1;

  // Submit handler
  const handleSubmit = () => {
    const formData = {
      formType: 'learning-center' as const,
      studentData,
      serviceSelection,
      experience,
      objectives,
      healthInfo,
      observations,
      consents,
    };
    console.log('Submitting form:', formData);
    // Handle submission
  };

  // Render the current step
  const renderCurrentStep = () => {
    // Section A: Student Data
    if (currentSectionId === 'A') {
      switch (currentStep) {
        case 0:
          return (
            <TextInputStep
              label="Student's Full Name"
              description="Please enter the student's complete name"
              value={studentData.fullName}
              onChange={(value) => setStudentData({ ...studentData, fullName: value })}
              placeholder="Enter full name"
              required
            />
          );
        case 1:
          return (
            <div className="space-y-6">
              <TextInputStep
                label="Student's Age"
                description="How old is the student?"
                value={studentData.age}
                onChange={(value) => setStudentData({ ...studentData, age: value })}
                placeholder="Enter age"
                type="number"
                required
              />
              <TextInputStep
                label="Document ID (Optional)"
                description="Identification number if available"
                value={studentData.documentId || ''}
                onChange={(value) => setStudentData({ ...studentData, documentId: value })}
                placeholder="Enter document number"
              />
            </div>
          );
        case 2:
          return (
            <TextInputStep
              label="Parent/Guardian Full Name"
              description="Name of the responsible adult"
              value={studentData.guardianName}
              onChange={(value) => setStudentData({ ...studentData, guardianName: value })}
              placeholder="Enter guardian name"
              required
            />
          );
        case 3:
          return (
            <TextInputStep
              label="Contact Phone Number"
              description="Primary phone for communication"
              value={studentData.phone}
              onChange={(value) => setStudentData({ ...studentData, phone: value })}
              placeholder="Enter phone number"
              type="tel"
              required
            />
          );
        case 4:
          return (
            <TextInputStep
              label="Email Address"
              description="For updates and communications"
              value={studentData.email}
              onChange={(value) => setStudentData({ ...studentData, email: value })}
              placeholder="Enter email address"
              type="email"
              required
            />
          );
      }
    }

    // Section B: Service Selection
    if (currentSectionId === 'B') {
      switch (currentStep) {
        case 0:
          return (
            <RadioStep
              label="Select Service Type"
              description="What type of program are you interested in?"
              options={serviceTypeOptions}
              value={serviceSelection.serviceType}
              onChange={(value) => setServiceSelection({ 
                ...serviceSelection, 
                serviceType: value as ServiceType 
              })}
              required
              columns={1}
            />
          );
        case 1:
          // Show language options if languages selected
          if (serviceSelection.serviceType === 'languages') {
            return (
              <CheckboxStep
                label="Select Languages"
                description="Which languages would you like to learn?"
                options={languageOptions}
                values={serviceSelection.languageOptions || []}
                onChange={(values) => setServiceSelection({ 
                  ...serviceSelection, 
                  languageOptions: values 
                })}
                columns={2}
              />
            );
          }
          // Show music options if music selected
          if (serviceSelection.serviceType === 'music') {
            return (
              <CheckboxStep
                label="Select Instruments"
                description="Which instruments would you like to learn?"
                options={musicOptions}
                values={serviceSelection.musicOptions || []}
                onChange={(values) => setServiceSelection({ 
                  ...serviceSelection, 
                  musicOptions: values 
                })}
                columns={2}
              />
            );
          }
          // Show art options if art selected
          if (serviceSelection.serviceType === 'art') {
            return (
              <CheckboxStep
                label="Select Art Forms"
                description="Which art disciplines interest you?"
                options={artOptions}
                values={serviceSelection.artOptions || []}
                onChange={(values) => setServiceSelection({ 
                  ...serviceSelection, 
                  artOptions: values 
                })}
                columns={2}
              />
            );
          }
          // Show sports options if sports selected
          if (serviceSelection.serviceType === 'sports') {
            return (
              <CheckboxStep
                label="Select Sports"
                description="Which sports activities interest you?"
                options={sportsOptions}
                values={serviceSelection.sportsOptions || []}
                onChange={(values) => setServiceSelection({ 
                  ...serviceSelection, 
                  sportsOptions: values 
                })}
                columns={2}
              />
            );
          }
          // For tutoring, skip to next step
          return (
            <div className="text-center py-8">
              <p className="text-slate-600 text-lg">
                Academic tutoring selected. Click Next to continue with experience details.
              </p>
            </div>
          );
        case 2:
        case 3:
        case 4:
          // Additional service selection steps (skip if not needed)
          return (
            <div className="text-center py-8">
              <p className="text-slate-600 text-lg">
                Service options configured. Click Next to continue.
              </p>
            </div>
          );
      }
    }

    // Section C: Experience
    if (currentSectionId === 'C') {
      switch (currentStep) {
        case 0:
          return (
            <RadioStep
              label="Previous Experience"
              description="Does the student have previous experience in this area?"
              options={yesNoOptions}
              value={experience.hasPreviousExperience}
              onChange={(value) => setExperience({ 
                ...experience, 
                hasPreviousExperience: value as 'yes' | 'no' 
              })}
              required
              columns={2}
            />
          );
        case 1:
          if (experience.hasPreviousExperience === 'yes') {
            return (
              <div className="space-y-6">
                <SelectStep
                  label="Approximate Level"
                  description="What is the student's current level?"
                  options={[
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                  ]}
                  value={experience.approximateLevel || ''}
                  onChange={(value) => setExperience({ 
                    ...experience, 
                    approximateLevel: value 
                  })}
                />
                <TextInputStep
                  label="Previous Institution (Optional)"
                  description="Where did the student study before?"
                  value={experience.previousInstitution || ''}
                  onChange={(value) => setExperience({ 
                    ...experience, 
                    previousInstitution: value 
                  })}
                  placeholder="Enter institution name"
                />
              </div>
            );
          }
          return (
            <div className="text-center py-8">
              <p className="text-slate-600 text-lg">
                No previous experience noted. Click Next to continue.
              </p>
            </div>
          );
        case 2:
          return (
            <TextareaStep
              label="Difficulties or Special Interests"
              description="Are there any specific challenges or interests we should know about?"
              value={experience.difficultiesOrInterests || ''}
              onChange={(value) => setExperience({ 
                ...experience, 
                difficultiesOrInterests: value 
              })}
              placeholder="Describe any specific learning needs, interests, or areas of focus..."
              rows={4}
            />
          );
      }
    }

    // Section D: Objectives
    if (currentSectionId === 'D') {
      switch (currentStep) {
        case 0:
          return (
            <TextareaStep
              label="Learning Goals"
              description="What do you hope to achieve through this program?"
              value={objectives.goals}
              onChange={(value) => setObjectives({ ...objectives, goals: value })}
              placeholder="Describe your main goals and expectations..."
              rows={4}
              required
            />
          );
        case 1:
          return (
            <TextareaStep
              label="Specific Objectives (Optional)"
              description="Any specific skills or milestones you'd like to reach?"
              value={objectives.specificObjective || ''}
              onChange={(value) => setObjectives({ 
                ...objectives, 
                specificObjective: value 
              })}
              placeholder="e.g., prepare for an exam, learn to play a specific song, improve speaking fluency..."
              rows={4}
            />
          );
      }
    }

    // Section E: Health Information
    if (currentSectionId === 'E') {
      switch (currentStep) {
        case 0:
          return (
            <div className="space-y-6">
              <RadioStep
                label="Medical Conditions"
                description="Does the student have any medical conditions we should be aware of?"
                options={yesNoOptions}
                value={healthInfo.hasMedicalCondition}
                onChange={(value) => setHealthInfo({ 
                  ...healthInfo, 
                  hasMedicalCondition: value as 'yes' | 'no' 
                })}
                required
                columns={2}
              />
              {healthInfo.hasMedicalCondition === 'yes' && (
                <TextareaStep
                  label="Medical Condition Details"
                  description="Please describe the medical conditions"
                  value={healthInfo.medicalConditionDetails || ''}
                  onChange={(value) => setHealthInfo({ 
                    ...healthInfo, 
                    medicalConditionDetails: value 
                  })}
                  placeholder="Describe any medical conditions..."
                  rows={3}
                />
              )}
            </div>
          );
        case 1:
          return (
            <div className="space-y-6">
              <RadioStep
                label="Allergies"
                description="Does the student have any allergies?"
                options={yesNoOptions}
                value={healthInfo.hasAllergies}
                onChange={(value) => setHealthInfo({ 
                  ...healthInfo, 
                  hasAllergies: value as 'yes' | 'no' 
                })}
                required
                columns={2}
              />
              {healthInfo.hasAllergies === 'yes' && (
                <TextareaStep
                  label="Allergy Details"
                  description="Please list all allergies"
                  value={healthInfo.allergyDetails || ''}
                  onChange={(value) => setHealthInfo({ 
                    ...healthInfo, 
                    allergyDetails: value 
                  })}
                  placeholder="List allergies..."
                  rows={3}
                />
              )}
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <RadioStep
                label="Medication"
                description="Does the student require any regular medication?"
                options={yesNoOptions}
                value={healthInfo.requiresMedication}
                onChange={(value) => setHealthInfo({ 
                  ...healthInfo, 
                  requiresMedication: value as 'yes' | 'no' 
                })}
                required
                columns={2}
              />
              {healthInfo.requiresMedication === 'yes' && (
                <TextareaStep
                  label="Medication Details"
                  description="Please describe the medication and schedule"
                  value={healthInfo.medicationDetails || ''}
                  onChange={(value) => setHealthInfo({ 
                    ...healthInfo, 
                    medicationDetails: value 
                  })}
                  placeholder="Describe medication and administration instructions..."
                  rows={3}
                />
              )}
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <RadioStep
                label="Physical Limitations"
                description="Does the student have any physical limitations?"
                options={yesNoOptions}
                value={healthInfo.hasPhysicalLimitation}
                onChange={(value) => setHealthInfo({ 
                  ...healthInfo, 
                  hasPhysicalLimitation: value as 'yes' | 'no' 
                })}
                required
                columns={2}
              />
              {healthInfo.hasPhysicalLimitation === 'yes' && (
                <TextareaStep
                  label="Physical Limitation Details"
                  description="Please describe the limitations"
                  value={healthInfo.physicalLimitationDetails || ''}
                  onChange={(value) => setHealthInfo({ 
                    ...healthInfo, 
                    physicalLimitationDetails: value 
                  })}
                  placeholder="Describe any physical limitations..."
                  rows={3}
                />
              )}
            </div>
          );
        case 4:
          return (
            <RadioStep
              label="Medical Clearance"
              description="For sports programs: Does the student have medical clearance for physical activity?"
              options={[
                { value: 'yes', label: 'Yes, has medical clearance' },
                { value: 'no', label: 'No, needs to obtain clearance' },
                { value: 'not-applicable', label: 'Not applicable (non-sports program)' },
              ]}
              value={healthInfo.hasMedicalClearance}
              onChange={(value) => setHealthInfo({ 
                ...healthInfo, 
                hasMedicalClearance: value as 'yes' | 'no' | 'not-applicable' 
              })}
              columns={1}
            />
          );
        case 5:
          return (
            <div className="space-y-6">
              <RadioStep
                label="Dietary Restrictions"
                description="Does the student have any dietary restrictions?"
                options={yesNoOptions}
                value={healthInfo.hasDietaryRestrictions}
                onChange={(value) => setHealthInfo({ 
                  ...healthInfo, 
                  hasDietaryRestrictions: value as 'yes' | 'no' 
                })}
                columns={2}
              />
              {healthInfo.hasDietaryRestrictions === 'yes' && (
                <>
                  <TextInputStep
                    label="Dietary Details"
                    description="Type of restriction (vegetarian, vegan, etc.)"
                    value={healthInfo.dietaryDetails || ''}
                    onChange={(value) => setHealthInfo({ 
                      ...healthInfo, 
                      dietaryDetails: value 
                    })}
                    placeholder="Enter dietary restriction type"
                  />
                  <TextareaStep
                    label="Foods to Avoid"
                    description="List specific foods that should be avoided"
                    value={healthInfo.foodsToAvoid || ''}
                    onChange={(value) => setHealthInfo({ 
                      ...healthInfo, 
                      foodsToAvoid: value 
                    })}
                    placeholder="List foods to avoid..."
                    rows={2}
                  />
                </>
              )}
            </div>
          );
      }
    }

    // Section F: Observations
    if (currentSectionId === 'F') {
      return (
        <TextareaStep
          label="Additional Observations"
          description="Is there anything else you'd like us to know about the student?"
          value={observations.additionalInfo || ''}
          onChange={(value) => setObservations({ additionalInfo: value })}
          placeholder="Any additional information, special needs, or questions..."
          rows={5}
        />
      );
    }

    // Section G: Consents
    if (currentSectionId === 'G') {
      switch (currentStep) {
        case 0:
          return (
            <ConfirmationStep
              label="Required Authorizations"
              description="Please review and accept the following"
              items={[
                {
                  key: 'dataProcessing',
                  label: 'I authorize the processing of the provided personal data for enrollment and communication purposes.',
                  required: true,
                },
                {
                  key: 'participationAuthorization',
                  label: 'I authorize the student to participate in the selected Learning Center program and activities.',
                  required: true,
                },
              ]}
              values={{
                dataProcessing: consents.dataProcessing,
                participationAuthorization: consents.participationAuthorization,
              }}
              onChange={(key, value) => setConsents({ 
                ...consents, 
                [key]: value 
              })}
            />
          );
        case 1:
          return (
            <TextInputStep
              label="Guardian's Full Name"
              description="Name of the person submitting this form"
              value={consents.guardianName}
              onChange={(value) => setConsents({ ...consents, guardianName: value })}
              placeholder="Enter your full name"
              required
            />
          );
        case 2:
          return (
            <TextInputStep
              label="Date"
              description="Today's date"
              value={consents.date}
              onChange={(value) => setConsents({ ...consents, date: value })}
              type="date"
              required
            />
          );
      }
    }

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">
          Learning Center Enrollment
        </h1>
        <p className="text-slate-600">
          Complete the form to enroll in our tutoring and enrichment programs
        </p>
      </div>

      {/* Progress Bar */}
      <AdmissionProgressBar
        currentStep={currentOverallStep}
        totalSteps={TOTAL_STEPS}
        sections={SECTIONS}
        currentSection={currentSectionId}
      />

      {/* Form Content */}
      <FormStepWrapper sectionTitle={`Section ${currentSectionId}: ${SECTIONS[currentSection].label}`}>
        {renderCurrentStep()}
        
        <NavigationButtons
          onBack={goToPrevStep}
          onNext={isLastStep ? handleSubmit : goToNextStep}
          showBack={!isFirstStep}
          nextLabel={isLastStep ? 'Submit Enrollment' : 'Continue'}
          backLabel="Back"
          isLastStep={isLastStep}
        />
      </FormStepWrapper>

      {/* Step indicator */}
      <div className="text-center mt-4 text-sm text-slate-500">
        Step {currentOverallStep} of {TOTAL_STEPS}
      </div>
    </div>
  );
}

export default LearningCenterAdmissionForm;
