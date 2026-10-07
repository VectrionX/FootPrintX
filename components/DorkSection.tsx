import React, { useState } from 'react';
import { ChevronDown, Layers } from 'lucide-react';
import { Dork, DorkCategory } from '../types';
import DorkCard from './DorkCard';

interface DorkSectionProps { category: DorkCategory; onRequestOpen: (dork: Dork) => void; }

const DorkSection: React.FC<DorkSectionProps> = ({ category, onRequestOpen }) => {
  const [isOpen, setIsOpen] = useState(true);
  const panelId = `category-${category.id}`;
  return <section className="space-y-3"><button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls={panelId} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-800 p-5 text-left hover:bg-slate-700"><span className="flex items-start gap-3"><Layers className="mt-0.5 h-5 w-5 text-blue-400" aria-hidden="true" /><span><span className="block font-semibold text-white">{category.title}</span><span className="mt-1 block text-sm font-normal text-slate-400">{category.explanation}</span></span></span><ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" /></button>{isOpen && <div id={panelId} className="grid gap-4 md:grid-cols-2">{category.dorks.map((dork) => <DorkCard key={dork.id} dork={dork} onRequestOpen={onRequestOpen} />)}</div>}</section>;
};

export default DorkSection;
