import nodemailer from 'nodemailer';
import schoolConfig from '@/config/school.json';

// Initialize Nodemailer transporter for Google Workspace/Gmail
const transporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  : null;

const ADMIN_EMAIL = 'direccion@valderramainternationalschool.com';
const FROM_EMAIL = process.env.GMAIL_USER || 'direccion@valderramainternationalschool.com';
const SCHOOL_NAME = schoolConfig.name;

interface AdmissionData {
  id: string;
  approval_token: string;
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

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getGradeLabel(grade: string): string {
  const grades: Record<string, string> = {
    'nursery': 'Nursery (1-2 años)',
    'maternal': 'Maternal (2-3 años)',
    'prekinder': 'Prekínder (3-4 años)',
    'kinder': 'Kínder (4-5 años)',
    'learning-center': 'Learning Center',
    'other': 'Otro'
  };
  return grades[grade] || grade;
}

export async function sendAdminNotificationEmail(data: AdmissionData): Promise<boolean> {
  if (!transporter) {
    console.warn('Email service not configured (GMAIL_USER or GMAIL_APP_PASSWORD missing). Skipping admin notification.');
    return false;
  }

  const baseUrl = getBaseUrl();
  const approveUrl = `${baseUrl}/api/admissions/review?token=${data.approval_token}&action=approve`;
  const denyUrl = `${baseUrl}/api/admissions/review?token=${data.approval_token}&action=deny`;
  const reviewPageUrl = `${baseUrl}/admissions/review/${data.approval_token}`;

  const submissionDate = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #C41E3A; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎓 Nueva Solicitud de Admisión</h1>
      <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Requiere su revisión y aprobación</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      <p style="color: #333; font-size: 16px; margin-bottom: 25px;">
        Se ha recibido una nueva solicitud de admisión. A continuación encontrará el resumen completo:
      </p>
      
      <!-- Student Information -->
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #C41E3A; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #C41E3A; padding-bottom: 10px;">
          👤 Información del Estudiante
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 40%;">Nombre Completo:</td>
            <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.studentName} ${data.studentLastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Documento:</td>
            <td style="padding: 8px 0; color: #333;">${data.studentDocument || 'No proporcionado'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Fecha de Nacimiento:</td>
            <td style="padding: 8px 0; color: #333;">${formatDate(data.studentBirthDate)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Grado Solicitado:</td>
            <td style="padding: 8px 0; color: #333; font-weight: 600;">${getGradeLabel(data.studentGrade)}</td>
          </tr>
        </table>
      </div>
      
      <!-- Parent Information -->
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #C41E3A; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #C41E3A; padding-bottom: 10px;">
          👨‍👩‍👧 Información del Acudiente
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 40%;">Nombre Completo:</td>
            <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.parentName} ${data.parentLastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Cédula:</td>
            <td style="padding: 8px 0; color: #333;">${data.parentDocument}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email:</td>
            <td style="padding: 8px 0; color: #333;">
              <a href="mailto:${data.parentEmail}" style="color: #C41E3A;">${data.parentEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Teléfono:</td>
            <td style="padding: 8px 0; color: #333;">
              <a href="tel:${data.parentPhone}" style="color: #C41E3A;">${data.parentPhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Dirección:</td>
            <td style="padding: 8px 0; color: #333;">${data.parentAddress}, ${data.parentCity}</td>
          </tr>
        </table>
      </div>
      
      <!-- Additional Information -->
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #C41E3A; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #C41E3A; padding-bottom: 10px;">
          📋 Información Adicional
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 40%;">Colegio Anterior:</td>
            <td style="padding: 8px 0; color: #333;">${data.previousSchool || 'No aplica'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Condiciones Médicas:</td>
            <td style="padding: 8px 0; color: #333;">${data.medicalConditions || 'Ninguna reportada'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Necesidades Especiales:</td>
            <td style="padding: 8px 0; color: #333;">${data.specialNeeds || 'Ninguna reportada'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">¿Cómo nos conoció?:</td>
            <td style="padding: 8px 0; color: #333;">${data.howDidYouHear || 'No especificado'}</td>
          </tr>
        </table>
        ${data.message ? `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
          <strong style="color: #666;">Mensaje adicional:</strong>
          <p style="color: #333; margin: 10px 0 0 0; padding: 10px; background-color: #fff; border-radius: 4px; font-style: italic;">
            "${data.message}"
          </p>
        </div>
        ` : ''}
      </div>
      
      <!-- Action Buttons -->
      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #666; margin-bottom: 20px;">¿Desea aprobar o denegar esta solicitud?</p>
        <table style="margin: 0 auto;">
          <tr>
            <td style="padding: 0 10px;">
              <a href="${approveUrl}" style="display: inline-block; background-color: #28a745; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                ✓ APROBAR
              </a>
            </td>
            <td style="padding: 0 10px;">
              <a href="${denyUrl}" style="display: inline-block; background-color: #dc3545; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                ✗ DENEGAR
              </a>
            </td>
          </tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          O visite la <a href="${reviewPageUrl}" style="color: #C41E3A;">página de revisión</a> para más opciones
        </p>
      </div>
      
      <!-- Submission Info -->
      <div style="background-color: #e9ecef; border-radius: 8px; padding: 15px; text-align: center;">
        <p style="color: #666; margin: 0; font-size: 14px;">
          📅 Fecha de solicitud: <strong>${submissionDate}</strong>
        </p>
        <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
          ID de solicitud: ${data.id}
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #333; padding: 20px; text-align: center;">
      <p style="color: #ffffff; margin: 0; font-size: 14px;">${SCHOOL_NAME}</p>
      <p style="color: #999; margin: 5px 0 0 0; font-size: 12px;">
        Cra. 5a # 8 - 82, Castillogrande, Cartagena
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `${SCHOOL_NAME} <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `🎓 Nueva Solicitud de Admisión - ${data.studentName} ${data.studentLastName}`,
      html: htmlContent,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
}

export async function sendApprovalEmail(
  parentEmail: string,
  studentName: string,
  parentName: string
): Promise<boolean> {
  if (!transporter) {
    console.warn('Email service not configured (GMAIL_USER or GMAIL_APP_PASSWORD missing). Skipping approval email.');
    return false;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #28a745; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 ¡Felicitaciones!</h1>
      <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">Solicitud de Admisión Aprobada</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Estimado/a <strong>${parentName}</strong>,
      </p>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Nos complace informarle que la solicitud de admisión para <strong>${studentName}</strong> 
        ha sido <span style="color: #28a745; font-weight: 600;">APROBADA</span>.
      </p>
      
      <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <p style="color: #155724; margin: 0; font-size: 16px;">
          ✓ Bienvenido/a a la familia de <strong>${SCHOOL_NAME}</strong>
        </p>
      </div>
      
      <h3 style="color: #C41E3A; font-size: 18px; margin-top: 30px;">Próximos Pasos:</h3>
      <ol style="color: #333; font-size: 15px; line-height: 1.8;">
        <li>Nos pondremos en contacto con usted en los próximos días para coordinar una reunión.</li>
        <li>Por favor prepare los documentos requeridos (certificado de nacimiento, carnet de vacunación, fotos).</li>
        <li>Visitaremos juntos nuestras instalaciones para que conozca nuestro ambiente educativo.</li>
      </ol>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 25px;">
        Si tiene alguna pregunta, no dude en contactarnos:
      </p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 15px;">
        <p style="margin: 5px 0; color: #333;">
          📞 Teléfono: <a href="tel:+573186428218" style="color: #C41E3A; text-decoration: none;">+57 318 642 8218</a>
        </p>
        <p style="margin: 5px 0; color: #333;">
          💬 WhatsApp: <a href="https://wa.me/573186428218" style="color: #25D366; text-decoration: none;">Enviar mensaje</a>
        </p>
        <p style="margin: 5px 0; color: #333;">
          ✉️ Email: <a href="mailto:iejpvalderrama@gmail.com" style="color: #C41E3A; text-decoration: none;">iejpvalderrama@gmail.com</a>
        </p>
      </div>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 30px;">
        ¡Estamos emocionados de comenzar este camino educativo juntos!
      </p>
      
      <p style="color: #333; font-size: 16px; margin-top: 30px;">
        Cordialmente,<br>
        <strong>Equipo de Admisiones</strong><br>
        <span style="color: #C41E3A;">${SCHOOL_NAME}</span>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #333; padding: 20px; text-align: center;">
      <p style="color: #ffffff; margin: 0; font-size: 14px;">${SCHOOL_NAME}</p>
      <p style="color: #999; margin: 5px 0 0 0; font-size: 12px;">
        Cra. 5a # 8 - 82, Castillogrande, Cartagena
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `${SCHOOL_NAME} <${FROM_EMAIL}>`,
      to: parentEmail,
      subject: `🎉 ¡Bienvenido/a! Su solicitud de admisión ha sido aprobada - ${SCHOOL_NAME}`,
      html: htmlContent,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending approval email:', error);
    return false;
  }
}

export async function sendDenialEmail(
  parentEmail: string,
  studentName: string,
  parentName: string,
  reason?: string
): Promise<boolean> {
  if (!transporter) {
    console.warn('Email service not configured (GMAIL_USER or GMAIL_APP_PASSWORD missing). Skipping denial email.');
    return false;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #C41E3A; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Resultado de Solicitud de Admisión</h1>
      <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">${SCHOOL_NAME}</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Estimado/a <strong>${parentName}</strong>,
      </p>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Agradecemos su interés en ${SCHOOL_NAME} y el tiempo dedicado a completar 
        la solicitud de admisión para <strong>${studentName}</strong>.
      </p>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Después de una cuidadosa revisión, lamentamos informarle que en este momento 
        no podemos proceder con la admisión.
      </p>
      
      ${reason ? `
      <div style="background-color: #f8f9fa; border-left: 4px solid #C41E3A; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <p style="color: #666; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">Observaciones:</p>
        <p style="color: #333; margin: 0; font-size: 15px; font-style: italic;">"${reason}"</p>
      </div>
      ` : ''}
      
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        Esta decisión no refleja de ninguna manera el valor de su hijo/a. Le animamos 
        a considerar aplicar nuevamente en el futuro si las circunstancias cambian.
      </p>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 25px;">
        Si desea más información o tiene preguntas, estamos disponibles para conversar:
      </p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 15px;">
        <p style="margin: 5px 0; color: #333;">
          📞 Teléfono: <a href="tel:+573186428218" style="color: #C41E3A; text-decoration: none;">+57 318 642 8218</a>
        </p>
        <p style="margin: 5px 0; color: #333;">
          ✉️ Email: <a href="mailto:iejpvalderrama@gmail.com" style="color: #C41E3A; text-decoration: none;">iejpvalderrama@gmail.com</a>
        </p>
      </div>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 30px;">
        Le deseamos mucho éxito en la búsqueda de la mejor opción educativa para su familia.
      </p>
      
      <p style="color: #333; font-size: 16px; margin-top: 30px;">
        Atentamente,<br>
        <strong>Equipo de Admisiones</strong><br>
        <span style="color: #C41E3A;">${SCHOOL_NAME}</span>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #333; padding: 20px; text-align: center;">
      <p style="color: #ffffff; margin: 0; font-size: 14px;">${SCHOOL_NAME}</p>
      <p style="color: #999; margin: 5px 0 0 0; font-size: 12px;">
        Cra. 5a # 8 - 82, Castillogrande, Cartagena
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `${SCHOOL_NAME} <${FROM_EMAIL}>`,
      to: parentEmail,
      subject: `Resultado de su solicitud de admisión - ${SCHOOL_NAME}`,
      html: htmlContent,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending denial email:', error);
    return false;
  }
}
