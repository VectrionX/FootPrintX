import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import { Dork } from '../types';
import { buildProviderUrl, getProvider } from '../services/workbench';

interface NavigationConfirmationProps { dork: Dork | null; onClose: () => void; }

const NavigationConfirmation: React.FC<NavigationConfirmationProps> = ({ dork, onClose }) => {
  if (!dork) return null;
  const provider = getProvider(dork.engine);
  const url = buildProviderUrl(dork.query, dork.engine);
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-labelledby="provider-confirmation-title">
      <div className="w-full max-w-lg rounded-3xl border border-blue-500/30 bg-[#111827] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4"><div><h2 id="provider-confirmation-title" className="text-xl font-bold text-white">Confirm external provider</h2><p className="mt-2 text-sm text-slate-400">FootprintX has not sent this query anywhere.</p></div><button type="button" onClick={onClose} aria-label="Cancel external navigation" className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X /></button></div>
        <dl className="mt-5 space-y-3 text-sm"><div><dt className="text-slate-500">Destination</dt><dd className="font-medium text-white">{provider.name} ({provider.host})</dd></div><div><dt className="text-slate-500">Query that will be sent</dt><dd className="mt-1 break-words rounded-lg bg-slate-950 p-3 font-mono text-xs text-blue-200">{dork.query}</dd></div></dl>
        <p className="mt-4 text-sm leading-relaxed text-amber-200">Continuing opens a new tab and sends this query to {provider.name}. That provider’s privacy policy, cookies, and terms apply. Review the provider and query before continuing.</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10">Cancel</button><a href={url} target="_blank" rel="noopener noreferrer" onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"><ExternalLink className="h-4 w-4" aria-hidden="true" />Continue to {provider.name}</a></div>
      </div>
    </div>
  );
};

export default NavigationConfirmation;
