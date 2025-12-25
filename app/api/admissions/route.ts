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

async function sendWhatsAppNotification(data: AdmissionData) {
  const phoneNumber = '+573186428218';
  
  // Format the message
  const message = `🎓 *Nueva Solicitud de Admisión*

*Estudiante:*
Nombre: ${data.studentName} ${data.studentLastName}
Documento: ${data.studentDocument || 'N/A'}
Fecha de Nacimiento: ${data.studentBirthDate}
Grado: ${data.studentGrade}

*Acudiente:*
Nombre: ${data.parentName} ${data.parentLastName}
Cédula: ${data.parentDocument}
Email: ${data.parentEmail}
Teléfono: ${data.parentPhone}
Dirección: ${data.parentAddress}, ${data.parentCity}

*Información Adicional:*
Colegio Anterior: ${data.previousSchool || 'N/A'}
Condiciones Médicas: ${data.medicalConditions || 'N/A'}
Necesidades Especiales: ${data.specialNeeds || 'N/A'}
Cómo nos conoció: ${data.howDidYouHear || 'N/A'}

${data.message ? `*Mensaje:*\n${data.message}` : ''}

---
Fecha de registro: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}`;

  try {
    // Using WhatsApp Business Cloud API
    const whatsappApiUrl = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    
    const response = await fetch(whatsappApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber.replace('+', ''),
        type: 'text',
        text: {
          preview_url: false,
          body: message
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('WhatsApp API error:', error);
      throw new Error('Failed to send WhatsApp notification');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    // Don't fail the whole request if notification fails
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const data: AdmissionData = await request.json();

    // Insert into Supabase and get back the ID and approval_token
    const { data: insertedData, error } = await supabase
      .from('admissions')
      .insert([{
        student_name: data.studentName,
        student_last_name: data.studentLastName,
        student_document: data.studentDocument || null,
        student_birth_date: data.studentBirthDate,
        student_grade: data.studentGrade,
        parent_name: data.parentName,
        parent_last_name: data.parentLastName,
        parent_document: data.parentDocument,
        parent_email: data.parentEmail,
        parent_phone: data.parentPhone,
        parent_address: data.parentAddress,
        parent_city: data.parentCity,
        previous_school: data.previousSchool || null,
        medical_conditions: data.medicalConditions || null,
        special_needs: data.specialNeeds || null,
        how_did_you_hear: data.howDidYouHear || null,
        message: data.message || null,
        status: 'pending'
      }])
      .select('id, approval_token')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    // Send email notification to admin with approval/deny links
    const emailSent = await sendAdminNotificationEmail({
      id: insertedData.id,
      approval_token: insertedData.approval_token,
      ...data
    });

    if (!emailSent) {
      console.error('Failed to send admin notification email, but admission was saved');
    }

    // Send WhatsApp notification (async, don't wait for it)
    sendWhatsAppNotification(data).catch(err => 
      console.error('WhatsApp notification failed:', err)
    );

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
