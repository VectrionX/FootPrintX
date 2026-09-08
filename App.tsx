import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Search } from 'lucide-react';
import CaseContext from './components/CaseContext';
import Disclaimer from './components/Disclaimer';
import DorkSection from './components/DorkSection';
import EmptyState from './components/EmptyState';
import InitialDisclaimerPopup from './components/InitialDisclaimerPopup';
import Layout from './components/Layout';
import NavigationConfirmation from './components/NavigationConfirmation';
import { generateEmailDorks, generateInstaDorks, generateLinkedInDorks, generatePersonDorks, generateXDorks } from './services/dorkEngine';
import { buildInvestigationExport, isInvestigationReady, safeExportFilename } from './services/workbench';
import { Dork, DorkCategory, InvestigationContext, ViewState } from './types';

const initialContext: InvestigationContext = { caseName: '', authorization: '', scope: '', notes: '', authorizedUseConfirmed: false };
const handlePattern = /^[a-zA-Z0-9._]{1,30}$/;
const namePattern = /^[a-zA-Z\s'-]{2,50}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [view, setView] = useState<ViewState>('HOME');
  const [context, setContext] = useState(initialContext);
  const [instagram, setInstagram] = useState('');
  const [xHandle, setXHandle] = useState('');
  const [linkedInName, setLinkedInName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [includeVariation, setIncludeVariation] = useState(true);
  const [pendingDork, setPendingDork] = useState<Dork | null>(null);
  const [exportStatus, setExportStatus] = useState('');

  const ready = isInvestigationReady(context);
  const active: { categories: DorkCategory[]; hasInput: boolean; label: string; description: string; valid: boolean } = useMemo(() => {
    if (view === 'INSTA') return { categories: ready && handlePattern.test(instagram.replace('@', '').trim()) ? generateInstaDorks(instagram) : [], hasInput: Boolean(instagram), label: 'Instagram public references', description: 'Prepare search-query previews for an authorized handle.', valid: handlePattern.test(instagram.replace('@', '').trim()) };
    if (view === 'X') return { categories: ready && handlePattern.test(xHandle.replace('@', '').trim()) ? generateXDorks(xHandle) : [], hasInput: Boolean(xHandle), label: 'X public references', description: 'Prepare search-query previews for an authorized handle.', valid: handlePattern.test(xHandle.replace('@', '').trim()) };
    if (view === 'LINKEDIN') return { categories: ready && namePattern.test(linkedInName.trim()) ? generateLinkedInDorks(linkedInName, company) : [], hasInput: Boolean(linkedInName), label: 'Professional public references', description: 'Prepare public-reference query previews for an authorized person or organization context.', valid: namePattern.test(linkedInName.trim()) };
    if (view === 'EMAIL') return { categories: ready && emailPattern.test(email.trim()) ? generateEmailDorks(email) : [], hasInput: Boolean(email), label: 'Public email references', description: 'Prepare public-reference query previews for an authorized address. No breach or private-source collection is included.', valid: emailPattern.test(email.trim()) };
    if (view === 'PERSON') { const valid = namePattern.test(firstName.trim()) && namePattern.test(lastName.trim()); return { categories: ready && valid ? generatePersonDorks(firstName, lastName, { variations: includeVariation }) : [], hasInput: Boolean(firstName || lastName), label: 'Person public references', description: 'Prepare limited public-reference query previews only within an authorized investigation.', valid }; }
    return { categories: [], hasInput: false, label: '', description: '', valid: false };
  }, [company, email, firstName, includeVariation, instagram, lastName, linkedInName, ready, view, xHandle]);

  const exportCase = () => {
    const payload = buildInvestigationExport(context, active.categories);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = safeExportFilename(context.caseName); link.click();
    URL.revokeObjectURL(url);
    setExportStatus('Local JSON export prepared. It contains your case context and current query previews, not provider results.');
  };

  const queryInput = () => {
    const shared = 'mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30';
    if (view === 'INSTA') return <label className="text-sm font-medium text-slate-200">Instagram handle<input value={instagram} onChange={(e) => setInstagram(e.target.value.replace('@', ''))} className={shared} placeholder="authorized_handle" /></label>;
    if (view === 'X') return <label className="text-sm font-medium text-slate-200">X handle<input value={xHandle} onChange={(e) => setXHandle(e.target.value.replace('@', ''))} className={shared} placeholder="authorized_handle" /></label>;
    if (view === 'LINKEDIN') return <div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium text-slate-200">Full name<input value={linkedInName} onChange={(e) => setLinkedInName(e.target.value)} className={shared} placeholder="Authorized person" /></label><label className="text-sm font-medium text-slate-200">Organization context (optional)<input value={company} onChange={(e) => setCompany(e.target.value)} className={shared} placeholder="Organization" /></label></div>;
    if (view === 'EMAIL') return <label className="text-sm font-medium text-slate-200">Authorized email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={shared} placeholder="authorized@example.com" /></label>;
    return <div className="space-y-4"><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium text-slate-200">First name<input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={shared} placeholder="First name" /></label><label className="text-sm font-medium text-slate-200">Last name<input value={lastName} onChange={(e) => setLastName(e.target.value)} className={shared} placeholder="Last name" /></label></div><label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={includeVariation} onChange={(e) => setIncludeVariation(e.target.checked)} /> Include a limited first-initial variation</label></div>;
  };

  const renderHome = () => <div className="space-y-6"><section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/60 to-slate-900 p-7"><p className="text-sm font-semibold uppercase tracking-wider text-blue-300">Client-side query preparation</p><h1 className="mt-3 text-3xl font-bold text-white">OSINT query workbench for authorized investigations</h1><p className="mt-3 max-w-3xl text-slate-300">Document your purpose and scope, prepare bounded search-query previews, then choose whether to copy, export locally, or explicitly open a named external provider. FootprintX does not execute searches or collect results.</p></section><Disclaimer /><CaseContext context={context} onChange={setContext} onExport={exportCase} exportDisabled={!ready} /><p role="status" className="text-sm text-emerald-300">{exportStatus}</p><section className="rounded-2xl border border-white/10 bg-[#111827] p-6"><h2 className="text-lg font-bold text-white">How this workbench behaves</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-400"><li>Query previews are generated locally after the case context is complete.</li><li>No automated search, crawling, scan, login, or provider request occurs.</li><li>External navigation requires a separate confirmation showing the provider and exact query.</li><li>Exports are downloaded locally as JSON and include no externally collected results.</li></ul></section></div>;

  const renderModule = () => <div className="space-y-6"><Disclaimer /><section className="rounded-3xl border border-white/10 bg-[#111827] p-6"><div className="flex items-start gap-3"><Search className="mt-1 text-blue-400" aria-hidden="true" /><div><h1 className="text-2xl font-bold text-white">{active.label}</h1><p className="mt-2 text-sm text-slate-400">{active.description}</p></div></div><div className="mt-6">{queryInput()}</div>{active.hasInput && !active.valid && <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-amber-300"><AlertCircle className="h-4 w-4" />Enter a valid value before previews can be prepared.</p>}{active.valid && ready && <p className="mt-3 flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" />Local query previews are ready for review; nothing has been sent to a provider.</p>}</section>{active.categories.length ? <div className="space-y-4">{active.categories.map((category) => <DorkSection key={category.id} category={category} onRequestOpen={setPendingDork} />)}</div> : <EmptyState ready={ready} hasInput={active.hasInput} />}</div>;

  const about = <div className="space-y-6"><Disclaimer /><section className="rounded-3xl border border-white/10 bg-[#111827] p-7"><Info className="text-blue-400" aria-hidden="true" /><h1 className="mt-4 text-3xl font-bold text-white">About FootprintX</h1><div className="mt-4 max-w-3xl space-y-4 text-slate-300"><p>FootprintX is a local, client-side workbench for preparing OSINT search-query previews in documented, authorized investigations. It is not an EASM product, scanning service, crawler, monitoring platform, or live-data collection tool.</p><p>The app holds case fields in the current browser tab. It does not transmit those fields itself. A query is shared with an external provider only after you review and explicitly confirm that provider link; provider privacy terms then apply.</p><p>Use independently verified authority, limit collection to your scope, and follow applicable law and provider terms. Query previews and public search results are not proof of identity, ownership, or risk.</p></div></section></div>;

  return <><Layout currentView={view} setView={setView}>{view === 'HOME' ? renderHome() : view === 'ABOUT' ? about : renderModule()}</Layout><NavigationConfirmation dork={pendingDork} onClose={() => setPendingDork(null)} />{!accepted && <InitialDisclaimerPopup onAccept={() => setAccepted(true)} />}</>;
};

export default App;
