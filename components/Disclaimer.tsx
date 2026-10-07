import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer: React.FC = () => (
  <aside aria-label="Authorized-use and provider notice" className="bg-amber-500/5 border border-amber-500/30 rounded-2xl p-5">
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" aria-hidden="true" />
      <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
        <h2 className="font-semibold text-amber-200">Authorized use only</h2>
        <p>Use only where you have documented authority and a defined scope. FootprintX prepares query previews; it does not scan systems, collect results, verify identities, or make live findings.</p>
        <p>Nothing is sent by FootprintX until you deliberately copy, export, or confirm an external-provider link. Confirming a link sends the displayed query to Google, Bing, or Yandex, which apply their own privacy notices and terms.</p>
      </div>
    </div>
  </aside>
);

export default Disclaimer;
