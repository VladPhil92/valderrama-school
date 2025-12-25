'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function AlreadyProcessedContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const isApproved = status === 'approved';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isApproved ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <span className="text-4xl">📋</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Solicitud Ya Procesada
          </h1>

          {/* Status */}
          <div className={`inline-block px-4 py-2 rounded-full mb-6 ${
            isApproved 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            Estado: <strong>{isApproved ? 'Aprobada' : 'Denegada'}</strong>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Esta solicitud de admisión ya fue revisada y procesada anteriormente.
            No es posible cambiar la decisión a través de este enlace.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-[#C41E3A] hover:bg-[#a01830] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Ir al Inicio
            </Link>
            <a
              href="mailto:iejpvalderrama@gmail.com"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Contactar Administrador
            </a>
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

export default function AlreadyProcessedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <AlreadyProcessedContent />
    </Suspense>
  );
}
