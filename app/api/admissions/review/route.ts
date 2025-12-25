import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendApprovalEmail, sendDenialEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const action = searchParams.get('action');

  // Validate parameters
  if (!token || !action) {
    return NextResponse.redirect(new URL('/admissions/review/error?reason=missing_params', request.url));
  }

  if (action !== 'approve' && action !== 'deny') {
    return NextResponse.redirect(new URL('/admissions/review/error?reason=invalid_action', request.url));
  }

  try {
    // Find the admission by token and check it's still pending
    const { data: admission, error: fetchError } = await supabase
      .from('admissions')
      .select('*')
      .eq('approval_token', token)
      .single();

    if (fetchError || !admission) {
      console.error('Error fetching admission:', fetchError);
      return NextResponse.redirect(new URL('/admissions/review/error?reason=not_found', request.url));
    }

    // Check if already processed
    if (admission.status !== 'pending') {
      return NextResponse.redirect(
        new URL(`/admissions/review/already-processed?status=${admission.status}`, request.url)
      );
    }

    // Update the admission status
    const newStatus = action === 'approve' ? 'approved' : 'denied';
    const { error: updateError } = await supabase
      .from('admissions')
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
      })
      .eq('approval_token', token);

    if (updateError) {
      console.error('Error updating admission:', updateError);
      return NextResponse.redirect(new URL('/admissions/review/error?reason=update_failed', request.url));
    }

    // Send email to the parent
    const parentName = `${admission.parent_name} ${admission.parent_last_name}`;
    const studentName = `${admission.student_name} ${admission.student_last_name}`;

    let emailSent = false;
    if (action === 'approve') {
      emailSent = await sendApprovalEmail(admission.parent_email, studentName, parentName);
    } else {
      emailSent = await sendDenialEmail(admission.parent_email, studentName, parentName);
    }

    // Redirect to success page
    const successUrl = new URL(`/admissions/review/success`, request.url);
    successUrl.searchParams.set('action', action);
    successUrl.searchParams.set('student', studentName);
    successUrl.searchParams.set('email_sent', emailSent ? 'true' : 'false');
    
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error('Error processing review:', error);
    return NextResponse.redirect(new URL('/admissions/review/error?reason=server_error', request.url));
  }
}

// POST endpoint for review page with notes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, action, notes } = body;

    // Validate parameters
    if (!token || !action) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    if (action !== 'approve' && action !== 'deny') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Find the admission by token and check it's still pending
    const { data: admission, error: fetchError } = await supabase
      .from('admissions')
      .select('*')
      .eq('approval_token', token)
      .single();

    if (fetchError || !admission) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Check if already processed
    if (admission.status !== 'pending') {
      return NextResponse.json(
        { error: 'Application already processed', status: admission.status },
        { status: 400 }
      );
    }

    // Update the admission status
    const newStatus = action === 'approve' ? 'approved' : 'denied';
    const { error: updateError } = await supabase
      .from('admissions')
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
        review_notes: notes || null,
      })
      .eq('approval_token', token);

    if (updateError) {
      console.error('Error updating admission:', updateError);
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      );
    }

    // Send email to the parent
    const parentName = `${admission.parent_name} ${admission.parent_last_name}`;
    const studentName = `${admission.student_name} ${admission.student_last_name}`;

    let emailSent = false;
    if (action === 'approve') {
      emailSent = await sendApprovalEmail(admission.parent_email, studentName, parentName);
    } else {
      emailSent = await sendDenialEmail(admission.parent_email, studentName, parentName, notes);
    }

    return NextResponse.json({
      success: true,
      message: `Application ${newStatus} successfully`,
      emailSent,
    });
  } catch (error) {
    console.error('Error processing review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
