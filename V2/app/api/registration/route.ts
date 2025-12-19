import { NextRequest, NextResponse } from 'next/server';

interface RegistrationData {
  parent: {
    full_name: string;
    email: string;
    phone: string;
  };
  student: {
    full_name: string;
    date_of_birth: string;
  };
  application: {
    application_type: 'preschool' | 'learning_center' | 'both';
    preschool_level?: 'nursery' | 'maternal' | 'prekinder' | 'kinder' | null;
  };
  learning_center?: {
    subjects: string[];
    intensity_hours_per_week: number;
    preferred_schedule?: string;
  } | null;
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    // Validate required fields
    if (!data.parent?.full_name || !data.parent?.email || !data.parent?.phone) {
      return NextResponse.json(
        { error: 'Parent information is required' },
        { status: 400 }
      );
    }

    if (!data.student?.full_name || !data.student?.date_of_birth) {
      return NextResponse.json(
        { error: 'Student information is required' },
        { status: 400 }
      );
    }

    if (!data.application?.application_type) {
      return NextResponse.json(
        { error: 'Application type is required' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      // Supabase not configured - log the registration and return success
      // This allows the form to work even without Supabase setup
      console.log('=== NEW REGISTRATION (Supabase not configured) ===');
      console.log('Parent:', data.parent);
      console.log('Student:', data.student);
      console.log('Application:', data.application);
      if (data.learning_center) {
        console.log('Learning Center:', data.learning_center);
      }
      console.log('================================================');

      // In production, you would want to:
      // 1. Send an email notification to admissions
      // 2. Store in a database
      // For now, we'll simulate success

      return NextResponse.json({
        success: true,
        message: 'Registration submitted successfully',
        applicationId: `APP-${Date.now()}`,
      });
    }

    // If Supabase is configured, use it
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create parent record
    const { data: parentData, error: parentError } = await supabase
      .from('parents')
      .insert({
        full_name: data.parent.full_name,
        email: data.parent.email,
        phone: data.parent.phone,
      })
      .select()
      .single();

    if (parentError) {
      console.error('Error creating parent:', parentError);
      return NextResponse.json(
        { error: 'Failed to create parent record' },
        { status: 500 }
      );
    }

    // Create student record
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .insert({
        parent_id: parentData.id,
        full_name: data.student.full_name,
        date_of_birth: data.student.date_of_birth,
      })
      .select()
      .single();

    if (studentError) {
      console.error('Error creating student:', studentError);
      return NextResponse.json(
        { error: 'Failed to create student record' },
        { status: 500 }
      );
    }

    // Create application record
    const { data: applicationData, error: applicationError } = await supabase
      .from('applications')
      .insert({
        student_id: studentData.id,
        application_type: data.application.application_type,
        preschool_level: data.application.preschool_level,
        status: 'submitted',
      })
      .select()
      .single();

    if (applicationError) {
      console.error('Error creating application:', applicationError);
      return NextResponse.json(
        { error: 'Failed to create application record' },
        { status: 500 }
      );
    }

    // Create learning center preferences if applicable
    if (data.learning_center && data.learning_center.subjects.length > 0) {
      const { error: lcError } = await supabase
        .from('learning_center_preferences')
        .insert({
          application_id: applicationData.id,
          subjects: data.learning_center.subjects,
          intensity_hours_per_week: data.learning_center.intensity_hours_per_week,
          preferred_schedule: data.learning_center.preferred_schedule || null,
        });

      if (lcError) {
        console.error('Error creating learning center preferences:', lcError);
        // Don't fail the whole request, just log the error
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully',
      applicationId: applicationData.id,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
