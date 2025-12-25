'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const emailSent = searchParams.get('email_sent') === 'true';
  const student = searchParams.get('student');

  const isApproved = action === 'approve';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isApproved ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <span className="text-4xl">
              {isApproved ? '✓' : '✗'}
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-2xl font-bold mb-3 ${
            isApproved ? 'text-green-700' : 'text-red-700'
          }`}>
            Solicitud {isApproved ? 'Aprobada' : 'Denegada'}
          </h1>

          {/* Student Name */}
          {student && (
            <p className="text-gray-600 mb-6">
              Estudiante: <strong>{student}</strong>
            </p>
          )}

          {/* Email Status */}
          <div className={`p-4 rounded-lg mb-6 ${
            emailSent 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-yellow-50 border border-yellow-200'
          }`}>
            {emailSent ? (
              <p className="text-green-700">
                ✉️ Se ha enviado un correo electrónico al acudiente notificando la decisión.
              </p>
            ) : (
              <p className="text-yellow-700">
                ⚠️ No se pudo enviar el correo de notificación. Por favor contacte al acudiente manualmente.
              </p>
            )}
          </div>

          {/* Message */}
          <p className="text-gray-500 text-sm mb-6">
            {isApproved 
              ? 'El acudiente recibirá instrucciones sobre los siguientes pasos del proceso de admisión.'
              : 'El acudiente ha sido notificado de la decisión de manera respetuosa.'
            }
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-[#C41E3A] hover:bg-[#a01830] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Ir al Inicio
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Valderrama International School</p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
