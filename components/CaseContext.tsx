import React from 'react';
import { CheckCircle2, Download, FileText, ShieldCheck } from 'lucide-react';
import { InvestigationContext } from '../types';

interface CaseContextProps {
  context: InvestigationContext;
  onChange: (context: InvestigationContext) => void;
  onExport: () => void;
  exportDisabled: boolean;
}

const CaseContext: React.FC<CaseContextProps> = ({ context, onChange, onExport, exportDisabled }) => {
  const update = <K extends keyof InvestigationContext>(key: K, value: InvestigationContext[K]) => onChange({ ...context, [key]: value });
  const complete = [context.caseName, context.authorization, context.scope].filter((value) => value.trim()).length;
  return (
    <section aria-labelledby="case-context-title" className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">Required before preparing queries</p>
          <h2 id="case-context-title" className="mt-1 flex items-center gap-2 text-xl font-bold text-white"><FileText className="h-5 w-5 text-blue-400" aria-hidden="true" />Investigation context</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">Record why this work is authorized and exactly what is in scope. This information stays in this browser tab unless you choose to export it.</p>
        </div>
        <button type="button" onClick={onExport} disabled={exportDisabled} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40">
          <Download className="h-4 w-4" aria-hidden="true" /> Export local JSON
        </button>
      </div>
      <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-slate-300">
        <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" aria-hidden="true" /><div><strong className="text-white">Three things to document</strong><ol className="mt-2 list-decimal space-y-1 pl-5"><li><strong>Case name:</strong> a short reference you can recognize later.</li><li><strong>Authorization:</strong> who approved the work and the authority you rely on.</li><li><strong>Approved scope:</strong> the identities, domains, organizations, or public sources you may investigate.</li></ol></div></div>
      </div>
      <p aria-live="polite" className={`mt-4 flex items-center gap-2 text-sm ${exportDisabled ? 'text-amber-300' : 'text-emerald-300'}`}>
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />{exportDisabled ? `${complete} of 3 required fields completed. Confirm authorization to unlock query previews.` : 'Context complete. You can now prepare and review local query previews.'}
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-300"><span>1. Case name</span><span className="ml-1 text-rose-300" aria-hidden="true">*</span><input required value={context.caseName} onChange={(event) => update('caseName', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="e.g. Vendor due diligence — Q3" /></label>
        <label className="text-sm font-medium text-slate-300"><span>2. Authorization basis</span><span className="ml-1 text-rose-300" aria-hidden="true">*</span><input required value={context.authorization} onChange={(event) => update('authorization', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="e.g. Written authorization dated 2026-09-10" /></label>
        <label className="text-sm font-medium text-slate-300 md:col-span-2"><span>3. Approved scope</span><span className="ml-1 text-rose-300" aria-hidden="true">*</span><input required value={context.scope} onChange={(event) => update('scope', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="e.g. northwind.example and named public profiles only" /><span className="mt-1 block text-xs font-normal text-slate-500">Do not enter systems, people, or sources that are not approved for this case.</span></label>
        <label className="text-sm font-medium text-slate-300 md:col-span-2">Optional investigator notes<textarea value={context.notes} onChange={(event) => update('notes', event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Purpose, handling instructions, constraints, and review notes" /></label>
      </div>
      <label className="mt-4 flex cursor-pointer gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-slate-200">
        <input type="checkbox" checked={context.authorizedUseConfirmed} onChange={(event) => update('authorizedUseConfirmed', event.target.checked)} className="mt-1 h-4 w-4" />
        <span><strong>I confirm this investigation is authorized</strong> and I will keep all queries and any provider results within the approved scope above. I understand FootprintX prepares queries only; it does not verify results or provider terms.</span>
      </label>
    </section>
  );
};

export default CaseContext;
