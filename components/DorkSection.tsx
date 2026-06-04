
import React, { useState } from 'react';
import { DorkCategory } from '../types';
import DorkCard from './DorkCard';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface DorkSectionProps {
  category: DorkCategory;
}

const DorkSection: React.FC<DorkSectionProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-[#1F2937] border border-white/5 rounded-2xl hover:bg-[#374151] transition-all group shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
             <Layers className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
              {category.title}
            </h3>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
              {category.explanation}
            </p>
          </div>
        </div>
        <div className={`text-slate-500 bg-[#111827] p-2 rounded-lg border border-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {category.dorks.map((dork) => (
            <DorkCard key={dork.id} dork={dork} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DorkSection;
