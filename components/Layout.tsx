import React, { ReactNode, useState } from 'react';
import { Info, Instagram, LayoutDashboard, Linkedin, Mail, Menu, Search, Terminal, Twitter, User, X } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps { children: ReactNode; currentView: ViewState; setView: (view: ViewState) => void; }

const items: Array<{ id: ViewState; label: string; icon: typeof Search }> = [
  { id: 'HOME', label: 'Workbench', icon: LayoutDashboard }, { id: 'INSTA', label: 'Instagram', icon: Instagram }, { id: 'X', label: 'X', icon: Twitter }, { id: 'LINKEDIN', label: 'LinkedIn', icon: Linkedin }, { id: 'EMAIL', label: 'Email', icon: Mail }, { id: 'PERSON', label: 'Person', icon: User }, { id: 'ABOUT', label: 'About', icon: Info },
];

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const [open, setOpen] = useState(false);
  const navigation = <nav aria-label="Workbench navigation" className="space-y-1">{items.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => { setView(item.id); setOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${currentView === item.id ? 'bg-blue-500/15 font-semibold text-blue-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><Icon className="h-4 w-4" aria-hidden="true" />{item.label}</button>; })}</nav>;
  return <div className="min-h-screen bg-[#0B0E14] text-slate-100"><header className="border-b border-white/10 bg-[#111827]"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4"><button type="button" onClick={() => setView('HOME')} className="flex items-center gap-2 text-left"><span className="rounded-lg bg-blue-600 p-2"><Terminal className="h-5 w-5" aria-hidden="true" /></span><span><span className="block text-lg font-bold">FootprintX</span><span className="block text-xs text-slate-400">Local OSINT query workbench</span></span></button><button type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden">{open ? <X aria-label="Close navigation" /> : <Menu aria-label="Open navigation" />}</button></div>{open && <div id="mobile-navigation" className="border-t border-white/10 px-4 py-3 lg:hidden">{navigation}</div>}</header><div className="mx-auto flex max-w-7xl gap-8 px-4 py-8"><aside className="hidden w-52 shrink-0 lg:block">{navigation}</aside><main className="min-w-0 flex-1">{children}</main></div><footer className="mx-auto max-w-7xl border-t border-white/10 px-4 py-6 text-xs text-slate-500">FootprintX prepares local query previews. It does not perform scans, retrieve provider results, or provide live collection.</footer></div>;
};

export default Layout;
