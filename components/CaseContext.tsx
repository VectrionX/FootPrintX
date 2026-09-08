import React from 'react';
import { Download, FileText } from 'lucide-react';
import { InvestigationContext } from '../types';

interface CaseContextProps {
  context: InvestigationContext;
  onChange: (context: InvestigationContext) => void;
  onExport: () => void;
  exportDisabled: boolean;
}

const CaseContext: React.FC<CaseContextProps> = ({ context, onChange, onExport, exportDisabled }) => {
  const update = <K extends keyof InvestigationContext>(key: K, value: InvestigationContext[K]) => onChange({ ...context, [key]: value });
  return (
    <section aria-labelledby="case-context-title" className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 id="case-context-title" className="flex items-center gap-2 text-xl font-bold text-white"><FileText className="w-5 h-5 text-blue-400" aria-hidden="true" />Investigation context</h2>
          <p className="mt-1 text-sm text-slate-400">Kept in this browser tab until you export or close it. No server-side storage.</p>
        </div>
        <button type="button" onClick={onExport} disabled={exportDisabled} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40">
          <Download className="w-4 h-4" aria-hidden="true" /> Export local JSON
        </button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-300">Case name<input required value={context.caseName} onChange={(event) => update('caseName', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="e.g. Vendor due diligence" /></label>
        <label className="text-sm font-medium text-slate-300">Authorization basis<input required value={context.authorization} onChange={(event) => update('authorization', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="e.g. Written authorization dated…" /></label>
        <label className="text-sm font-medium text-slate-300 md:col-span-2">Approved scope<input required value={context.scope} onChange={(event) => update('scope', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Systems, identities, domains, or public sources in scope" /></label>
        <label className="text-sm font-medium text-slate-300 md:col-span-2">Investigator notes<textarea value={context.notes} onChange={(event) => update('notes', event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Purpose, limitations, review notes, and handling instructions" /></label>
      </div>
      <label className="mt-4 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-slate-200 cursor-pointer">
        <input type="checkbox" checked={context.authorizedUseConfirmed} onChange={(event) => update('authorizedUseConfirmed', event.target.checked)} className="mt-1 h-4 w-4" />
        <span>I confirm this case is authorized and limited to the scope above. I will independently assess the provider’s terms and any results.</span>
      </label>
    </section>
  );
};

export default CaseContext;
