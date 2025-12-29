import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendAdminNotificationEmail } from '@/lib/email';

interface AdmissionData {
  studentName: string;
  studentLastName: string;
  studentDocument?: string;
  studentBirthDate: string;
  studentGrade: string;
  parentName: string;
  parentLastName: string;
  parentDocument: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  parentCity: string;
  previousSchool?: string;
  medicalConditions?: string;
  specialNeeds?: string;
  howDidYouHear?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const data: AdmissionData = await request.json();
    
    console.log('Received admission data:', JSON.stringify(data, null, 2));

    // Validate required fields - provide defaults for optional parent info
    const insertData = {
      student_name: data.studentName || 'Not provided',
      student_last_name: data.studentLastName || '',
      student_document: data.studentDocument || null,
      student_birth_date: data.studentBirthDate || null,
      student_grade: data.studentGrade || 'Not specified',
      parent_name: data.parentName || 'Not provided',
      parent_last_name: data.parentLastName || '',
      parent_document: data.parentDocument || '',
      parent_email: data.parentEmail || 'no-email@placeholder.com',
      parent_phone: data.parentPhone || 'Not provided',
      parent_address: data.parentAddress || '',
      parent_city: data.parentCity || '',
      previous_school: data.previousSchool || null,
      medical_conditions: data.medicalConditions || null,
      special_needs: data.specialNeeds || null,
      how_did_you_hear: data.howDidYouHear || null,
      message: data.message || null,
      status: 'pending',
    };

    console.log('Inserting into Supabase:', JSON.stringify(insertData, null, 2));

    // Insert into Supabase and get back the ID and approval_token
    const { data: insertedData, error } = await supabase
      .from('admissions')
      .insert([insertData])
      .select('id, approval_token')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      console.error('Supabase error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to submit application', details: error.message },
        { status: 500 }
      );
    }

    console.log('Successfully inserted admission:', insertedData);

    // Send email notification to admin with approval/deny links
    const emailSent = await sendAdminNotificationEmail({
      id: insertedData.id,
      approval_token: insertedData.approval_token,
      ...data
    });

    if (!emailSent) {
      console.error('Failed to send admin notification email, but admission was saved');
    }

    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        id: insertedData.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
