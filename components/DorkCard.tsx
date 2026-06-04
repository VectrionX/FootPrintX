
import React, { useState } from 'react';
import { Dork, Engine } from '../types';
import { Copy, Check, ExternalLink, Search } from 'lucide-react';

interface DorkCardProps {
  dork: Dork;
}

const DorkCard: React.FC<DorkCardProps> = ({ dork }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(dork.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEngineBadge = (engine: Engine) => {
    switch (engine) {
      case Engine.GOOGLE: return <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wide">Google</span>;
      case Engine.BING: return <span className="text-[10px] font-bold px-2 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase tracking-wide">Bing</span>;
      case Engine.YANDEX: return <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wide">Yandex</span>;
      default: return <span className="text-[10px] font-bold px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wide">Multi</span>;
    }
  };

  const getSearchUrl = () => {
    const encoded = encodeURIComponent(dork.query);
    switch (dork.engine) {
      case Engine.GOOGLE: return `https://www.google.com/search?q=${encoded}`;
      case Engine.BING: return `https://www.bing.com/search?q=${encoded}`;
      case Engine.YANDEX: return `https://yandex.com/search/?text=${encoded}`;
      default: return `https://www.google.com/search?q=${encoded}`;
    }
  };

  return (
    <div className="group bg-[#111827] border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.05)] flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-[#1F2937] rounded-lg border border-white/5 group-hover:border-blue-500/20 transition-colors">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
           </div>
           <div>
             <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
               {dork.title}
             </h4>
             <div className="mt-1">{getEngineBadge(dork.engine)}</div>
           </div>
        </div>
        
        <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all ${
              copied 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
            title="Copy Query"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <a
            href={getSearchUrl()}
            target="_blank"
            rel="noreferrer"
            className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-all"
            title="Execute Search"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow">
         {dork.description}
      </p>

      <div className="relative mt-auto">
        <div className="font-mono text-[11px] bg-[#05070A] p-3 rounded-lg border border-white/5 overflow-x-auto whitespace-nowrap text-blue-300 selection:bg-blue-500/30 shadow-inner group-hover:border-blue-500/20 transition-colors">
          {dork.query}
        </div>
      </div>
    </div>
  );
};

export default DorkCard;
