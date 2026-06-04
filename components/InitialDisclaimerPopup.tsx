import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';

interface InitialDisclaimerPopupProps {
  onAccept: () => void;
}

const InitialDisclaimerPopup: React.FC<InitialDisclaimerPopupProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111827] border border-blue-500/20 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to FootprintX</h2>
              <p className="text-blue-400 text-sm font-medium">Initial Version Release</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-[#1F2937]/50 rounded-2xl p-4 border border-white/5 flex gap-4 items-start">
              <Shield className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-1">Total Privacy Enforcement</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  No data will be saved or stored. This application is fully loaded into your device's RAM. All data and inputs are permanently wiped upon closing this session.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button 
              onClick={onAccept}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              I Understand & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialDisclaimerPopup;
