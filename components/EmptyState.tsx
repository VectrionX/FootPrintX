import React from 'react';
import { FileWarning, LockKeyhole } from 'lucide-react';

interface EmptyStateProps {
  ready: boolean;
  hasInput: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ ready, hasInput }) => (
  <section aria-live="polite" className="border border-dashed border-slate-600 rounded-2xl bg-slate-900/50 p-6 text-center">
    {ready ? <FileWarning className="mx-auto mb-3 text-slate-400" aria-hidden="true" /> : <LockKeyhole className="mx-auto mb-3 text-amber-400" aria-hidden="true" />}
    <h2 className="text-base font-semibold text-white">{ready ? 'No query previews yet' : 'Investigation context required'}</h2>
    <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
      {ready
        ? (hasInput ? 'Check the input format, then revise it to prepare query previews.' : 'Enter a scoped search term to prepare local query previews.')
        : 'Complete the case name, authorization basis, scope, and acknowledgement before query previews are prepared.'}
    </p>
  </section>
);

export default EmptyState;
