import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface InitialDisclaimerPopupProps { onAccept: () => void; }

const InitialDisclaimerPopup: React.FC<InitialDisclaimerPopupProps> = ({ onAccept }) => {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-labelledby="use-notice-title">
      <div className="max-w-xl rounded-3xl border border-blue-500/30 bg-[#111827] p-6 shadow-2xl">
        <ShieldCheck className="text-emerald-400 mb-4" aria-hidden="true" />
        <h1 id="use-notice-title" className="text-2xl font-bold text-white">Before you prepare a query</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
          <p>FootprintX is a client-side OSINT query workbench, not an EASM platform and not a live collection service. It prepares search-query previews only.</p>
          <p>No search runs automatically. If you later confirm an external link, the query leaves this app and is sent to the named provider (Google, Bing, or Yandex) under that provider’s terms and privacy policy.</p>
        </div>
        <label className="mt-5 flex gap-3 rounded-xl bg-slate-800 p-4 text-sm text-slate-200 cursor-pointer">
          <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1 h-4 w-4" />
          <span>I will use this workbench only for an investigation I am authorized to conduct, within a documented scope.</span>
        </label>
        <button type="button" disabled={!confirmed} onClick={onAccept} className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-blue-500">
          Continue to local workbench
        </button>
      </div>
    </div>
  );
};

export default InitialDisclaimerPopup;
