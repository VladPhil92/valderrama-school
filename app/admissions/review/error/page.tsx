'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  const errorMessages: Record<string, { title: string; description: string }> = {
    missing_params: {
      title: 'Parámetros Faltantes',
      description: 'El enlace no contiene la información necesaria para procesar la solicitud.',
    },
    invalid_action: {
      title: 'Acción Inválida',
      description: 'La acción solicitada no es válida. Solo se permite aprobar o denegar.',
    },
    not_found: {
      title: 'Solicitud No Encontrada',
      description: 'No se encontró la solicitud de admisión. Es posible que el enlace sea incorrecto o haya expirado.',
    },
    update_failed: {
      title: 'Error al Actualizar',
      description: 'Hubo un problema al actualizar el estado de la solicitud. Por favor intente nuevamente.',
    },
    server_error: {
      title: 'Error del Servidor',
      description: 'Ocurrió un error inesperado. Por favor intente nuevamente más tarde.',
    },
  };

  const error = errorMessages[reason || ''] || {
    title: 'Error Desconocido',
    description: 'Ocurrió un error al procesar su solicitud.',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-red-700 mb-3">
            {error.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {error.description}
          </p>

          {/* Debug Info */}
          {reason && (
            <p className="text-xs text-gray-400 mb-6">
              Código de error: {reason}
            </p>
          )}

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
              Contactar Soporte
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

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
