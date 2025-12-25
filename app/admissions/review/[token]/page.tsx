import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ReviewActions from '@/app/admissions/review/[token]/ReviewActions';

interface PageProps {
  params: Promise<{ token: string }>;
}

async function getAdmission(token: string) {
  const { data, error } = await supabase
    .from('admissions')
    .select('*')
    .eq('approval_token', token)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
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

export default async function ReviewPage({ params }: PageProps) {
  const { token } = await params;
  const admission = await getAdmission(token);

  if (!admission) {
    notFound();
  }

  const isPending = admission.status === 'pending';
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    approved: 'bg-green-100 text-green-800 border-green-300',
    denied: 'bg-red-100 text-red-800 border-red-300',
  };

  const statusLabels = {
    pending: 'Pendiente de Revisión',
    approved: 'Aprobada',
    denied: 'Denegada',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Revisión de Solicitud de Admisión
          </h1>
          <p className="text-gray-600">Valderrama International School</p>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <span className={`px-4 py-2 rounded-full border font-medium ${statusColors[admission.status as keyof typeof statusColors]}`}>
            {statusLabels[admission.status as keyof typeof statusLabels]}
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Student Information */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-[#C41E3A] mb-4 flex items-center gap-2">
              <span>👤</span> Información del Estudiante
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Nombre Completo</label>
                <p className="font-medium">{admission.student_name} {admission.student_last_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Documento</label>
                <p className="font-medium">{admission.student_document || 'No proporcionado'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
                <p className="font-medium">{formatDate(admission.student_birth_date)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Grado Solicitado</label>
                <p className="font-medium text-[#C41E3A]">{getGradeLabel(admission.student_grade)}</p>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-[#C41E3A] mb-4 flex items-center gap-2">
              <span>👨‍👩‍👧</span> Información del Acudiente
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Nombre Completo</label>
                <p className="font-medium">{admission.parent_name} {admission.parent_last_name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Cédula</label>
                <p className="font-medium">{admission.parent_document}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">
                  <a href={`mailto:${admission.parent_email}`} className="text-[#C41E3A] hover:underline">
                    {admission.parent_email}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Teléfono</label>
                <p className="font-medium">
                  <a href={`tel:${admission.parent_phone}`} className="text-[#C41E3A] hover:underline">
                    {admission.parent_phone}
                  </a>
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Dirección</label>
                <p className="font-medium">{admission.parent_address}, {admission.parent_city}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-[#C41E3A] mb-4 flex items-center gap-2">
              <span>📋</span> Información Adicional
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Colegio Anterior</label>
                <p className="font-medium">{admission.previous_school || 'No aplica'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">¿Cómo nos conoció?</label>
                <p className="font-medium">{admission.how_did_you_hear || 'No especificado'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Condiciones Médicas</label>
                <p className="font-medium">{admission.medical_conditions || 'Ninguna reportada'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Necesidades Especiales</label>
                <p className="font-medium">{admission.special_needs || 'Ninguna reportada'}</p>
              </div>
            </div>
            {admission.message && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <label className="text-sm text-gray-500 block mb-2">Mensaje Adicional</label>
                <p className="italic text-gray-700">&ldquo;{admission.message}&rdquo;</p>
              </div>
            )}
          </div>

          {/* Submission Info */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium">📅 Fecha de solicitud:</span>{' '}
                {new Date(admission.created_at).toLocaleString('es-CO', {
                  dateStyle: 'long',
                  timeStyle: 'short'
                })}
              </div>
              <div>
                <span className="font-medium">🔑 ID:</span>{' '}
                <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">{admission.id}</code>
              </div>
            </div>
            {admission.reviewed_at && (
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium">✅ Revisada:</span>{' '}
                {new Date(admission.reviewed_at).toLocaleString('es-CO', {
                  dateStyle: 'long',
                  timeStyle: 'short'
                })}
              </div>
            )}
            {admission.review_notes && (
              <div className="mt-3 p-3 bg-white rounded border">
                <span className="text-sm font-medium text-gray-600 block mb-1">📝 Notas de revisión:</span>
                <p className="text-gray-700">{admission.review_notes}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {isPending ? (
            <ReviewActions token={token} />
          ) : (
            <div className="p-6 text-center text-gray-500">
              Esta solicitud ya ha sido procesada.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Valderrama International School</p>
          <p>Cra. 5a # 8 - 82, Castillogrande, Cartagena</p>
        </div>
      </div>
    </div>
  );
}
