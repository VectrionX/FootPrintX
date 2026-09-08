import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Search } from 'lucide-react';
import { Dork } from '../types';
import { getProvider } from '../services/workbench';

interface DorkCardProps { dork: Dork; onRequestOpen: (dork: Dork) => void; }

const DorkCard: React.FC<DorkCardProps> = ({ dork, onRequestOpen }) => {
  const [status, setStatus] = useState('');
  const copy = async () => {
    try { await navigator.clipboard.writeText(dork.query); setStatus('Query copied locally.'); }
    catch { setStatus('Copy failed. Select the query text and copy it manually.'); }
  };
  const provider = getProvider(dork.engine);
  return <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#111827] p-5"><div className="flex items-start gap-3"><Search className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" /><div><h3 className="font-semibold text-white">{dork.title}</h3><p className="mt-1 text-xs text-slate-400">Prepared for {provider.name}; not run automatically.</p></div></div><p className="mt-4 flex-grow text-sm leading-relaxed text-slate-400">{dork.description}</p><code className="mt-4 block overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-blue-200">{dork.query}</code><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"><Copy className="h-4 w-4" aria-hidden="true" />Copy</button><button type="button" onClick={() => onRequestOpen(dork)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"><ExternalLink className="h-4 w-4" aria-hidden="true" />Review & open {provider.name}</button></div><p aria-live="polite" className="mt-2 min-h-5 text-xs text-slate-400">{status}</p></article>;
};

export default DorkCard;
