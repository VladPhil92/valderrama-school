'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReviewActionsProps {
  token: string;
}

export default function ReviewActions({ token }: ReviewActionsProps) {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'approve' | 'deny' | null>(null);

  const handleAction = async (action: 'approve' | 'deny') => {
    // For deny, show notes input first
    if (action === 'deny' && !showNotesInput) {
      setSelectedAction('deny');
      setShowNotesInput(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admissions/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          action,
          notes: notes || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to success page
        const params = new URLSearchParams({
          action,
          email_sent: data.emailSent ? 'true' : 'false',
        });
        router.push(`/admissions/review/success?${params.toString()}`);
      } else {
        alert(data.error || 'Error al procesar la solicitud');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Por favor intente nuevamente.');
      setIsSubmitting(false);
    }
  };

  const handleApprove = () => handleAction('approve');
  const handleDeny = () => handleAction('deny');

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        ¿Desea aprobar o denegar esta solicitud?
      </h3>

      {/* Optional Notes */}
      <div className="mb-6">
        {!showNotesInput ? (
          <button
            type="button"
            onClick={() => setShowNotesInput(true)}
            className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
          >
            + Agregar notas (opcional)
          </button>
        ) : (
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notas {selectedAction === 'deny' ? '(recomendado para denegaciones)' : '(opcional)'}
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escriba aquí cualquier observación o razón de la decisión..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={handleApprove}
          disabled={isSubmitting}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting && selectedAction === 'approve' ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesando...
            </>
          ) : (
            <>
              <span className="text-xl">✓</span>
              APROBAR
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDeny}
          disabled={isSubmitting}
          className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting && selectedAction === 'deny' ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesando...
            </>
          ) : (
            <>
              <span className="text-xl">✗</span>
              DENEGAR
            </>
          )}
        </button>
      </div>

      {/* Warning */}
      <p className="mt-4 text-center text-sm text-gray-500">
        ⚠️ Esta acción enviará automáticamente un correo al acudiente con el resultado.
      </p>
    </div>
  );
}
