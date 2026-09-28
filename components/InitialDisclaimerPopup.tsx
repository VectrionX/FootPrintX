import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, Shield } from 'lucide-react';

interface InitialDisclaimerPopupProps {
  onAccept: () => void;
}

const InitialDisclaimerPopup: React.FC<InitialDisclaimerPopupProps> = ({ onAccept }) => {
  const [step, setStep] = useState(1);
  const [authorized, setAuthorized] = useState(false);
  const [context, setContext] = useState('');
  const [provider, setProvider] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    headingRef.current?.focus();
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('button, input, [href], [tabindex]:not([tabindex="-1"])')).filter((node) => !node.hasAttribute('disabled'));
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') event.preventDefault();
      if (event.key !== 'Tab') return;
      const nodes = focusable();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => {
      document.removeEventListener('keydown', trapFocus);
      previouslyFocused.current?.focus();
    };
  }, []);

  useEffect(() => headingRef.current?.focus(), [step]);
  const next = () => setStep((current) => Math.min(3, current + 1));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" role="presentation">
      <div ref={dialogRef} className="bg-[#111827] border border-blue-500/20 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-description">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20" aria-hidden="true"><AlertCircle className="w-6 h-6 text-amber-500" /></div>
            <div><h1 id="gate-title" ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white tracking-tight">Before you continue</h1><p id="gate-description" className="text-blue-400 text-sm font-medium">Safety and privacy gate · Step {step} of 3</p></div>
          </div>
          <div className="space-y-4 mb-8 min-h-44">
            {step === 1 && <div className="bg-[#1F2937]/50 rounded-2xl p-4 border border-white/5 flex gap-4 items-start"><Shield className="w-6 h-6 text-emerald-500 shrink-0 mt-1" aria-hidden="true" /><div><h2 className="text-white font-semibold mb-1">Use only with authorization</h2><p className="text-sm text-slate-400 leading-relaxed">FootPrintX creates passive search queries. Confirm that your target and intended research are lawful and authorized.</p><label className="flex items-start gap-3 mt-4 text-sm text-slate-300 cursor-pointer"><input aria-label="Confirm lawful authorization" type="checkbox" checked={authorized} onChange={(event) => setAuthorized(event.target.checked)} className="mt-1 h-5 w-5 accent-blue-500" /><span>I have authorization or a lawful basis for this research.</span></label></div></div>}
            {step === 2 && <div className="bg-[#1F2937]/50 rounded-2xl p-4 border border-white/5"><h2 className="text-white font-semibold mb-1">Set the research context</h2><p className="text-sm text-slate-400 mb-4">This stays in browser memory and is not submitted anywhere.</p><fieldset className="space-y-2"><legend className="sr-only">Research context</legend>{['My organization / owned assets', 'Client or explicitly authorized assessment', 'Education or defensive research'].map((label) => <label key={label} className="flex items-center gap-3 min-h-11 text-sm text-slate-300 cursor-pointer"><input aria-label={label} type="radio" name="research-context" value={label} checked={context === label} onChange={(event) => setContext(event.target.value)} className="h-5 w-5 accent-blue-500" />{label}</label>)}</fieldset></div>}
            {step === 3 && <div className="bg-[#1F2937]/50 rounded-2xl p-4 border border-white/5 flex gap-4 items-start"><Shield className="w-6 h-6 text-emerald-500 shrink-0 mt-1" aria-hidden="true" /><div><h2 className="text-white font-semibold mb-1">Keep provider egress explicit</h2><p className="text-sm text-slate-400 leading-relaxed">No target requests, telemetry, or storage are performed here. Opening a generated query is the only action that can send text to a selected search provider.</p><label className="flex items-start gap-3 mt-4 text-sm text-slate-300 cursor-pointer"><input aria-label="Confirm provider navigation" type="checkbox" checked={provider} onChange={(event) => setProvider(event.target.checked)} className="mt-1 h-5 w-5 accent-blue-500" /><span>I understand provider navigation requires my explicit confirmation.</span></label></div></div>}
          </div>
          <div className="flex justify-between gap-3 pt-4 border-t border-white/5"><span className="text-xs text-slate-500 self-center">Nothing leaves this page until you choose it.</span><button type="button" onClick={step === 3 ? onAccept : next} disabled={(step === 1 && !authorized) || (step === 2 && !context) || (step === 3 && !provider)} className="min-h-11 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 inline-flex items-center gap-2">{step === 3 ? <><Check className="w-4 h-4" aria-hidden="true" /> Enter FootPrintX</> : 'Continue'}</button></div>
        </div>
      </div>
    </div>
  );
};

export default InitialDisclaimerPopup;
