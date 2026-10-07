
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-[#111827] border border-l-4 border-l-amber-500 border-y-white/5 border-r-white/5 rounded-r-xl p-6 mb-8 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-amber-500/10 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1">Compliance Warning</h3>
          <div className="text-xs text-slate-400 leading-relaxed">
            <p className="mb-2">
              FootprintX generates search queries for <span className="text-amber-400 font-medium">educational and lawful OSINT purposes only</span>. 
              No infrastructure is scanned. No data is stored.
            </p>
            <p className="opacity-80">
              By using this tool, you agree to adhere to all applicable laws and search engine Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
