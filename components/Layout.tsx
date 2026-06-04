
import React, { ReactNode } from 'react';
import { ViewState } from '../types';
import { Shield, User, Instagram, Github, Info, Menu, X, Terminal, Twitter, Linkedin, Mail, Heart, Scale, LayoutDashboard, Search, Bell, Activity } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'HOME' as ViewState, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'INSTA' as ViewState, label: 'Instagram', icon: Instagram },
    { id: 'X' as ViewState, label: 'X (Twitter)', icon: Twitter },
    { id: 'LINKEDIN' as ViewState, label: 'LinkedIn', icon: Linkedin },
    { id: 'EMAIL' as ViewState, label: 'Email OSINT', icon: Mail },
    { id: 'PERSON' as ViewState, label: 'Person Lookup', icon: User },
    { id: 'ABOUT' as ViewState, label: 'About', icon: Info },
  ];

  const currentLabel = navItems.find(item => item.id === currentView)?.label || 'Dashboard';

  return (
    <div className="min-h-screen flex bg-[#0B0E14] text-slate-200 font-sans overflow-hidden selection:bg-blue-500/30">
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex w-72 flex-col bg-[#111827] border-r border-white/5 relative z-20 shadow-2xl shadow-black/50">
        {/* Logo Area */}
        <div className="p-8 pb-4 flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 bg-gradient-to-br from-blue-500 to-blue-700">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-wide block leading-none">FootprintX</span>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Pro Edition</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto scrollbar-hide">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">Main Menu</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                currentView === item.id 
                  ? 'bg-blue-600/10 text-blue-400 font-medium shadow-[0_0_20px_rgba(37,99,235,0.1)] border border-blue-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${currentView === item.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="tracking-wide text-sm">{item.label}</span>
              {currentView === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_currentColor]" />
              )}
            </button>
          ))}
          

        </nav>

        {/* Sidebar Footer User Profile Stub */}
        <div className="p-4 mt-auto">
          <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-inner">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold text-white truncate">SYSTEM ONLINE</div>
              <div className="text-xs text-emerald-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Protected Mode
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#0B0E14]">
        
        {/* Mobile Header */}
        <header className="xl:hidden sticky top-0 z-50 bg-[#0B0E14]/80 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2" onClick={() => setView('HOME')}>
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">FootprintX</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="border-t border-white/10 bg-[#111827] px-4 py-4 space-y-1 shadow-2xl absolute w-full left-0 z-50">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setView(item.id); setIsMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                    currentView === item.id ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Desktop Topbar */}
        <header className="hidden xl:flex h-24 items-center justify-between px-10 pt-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{currentLabel}</h1>
            <p className="text-slate-400 text-sm mt-1">Overview and controls</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search dorks..." 
                className="bg-[#1F2937] border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all"
              />
            </div>
            <button className="p-2.5 rounded-full bg-[#1F2937] text-slate-400 hover:text-white hover:bg-[#374151] transition-colors border border-white/5 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1F2937]"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 xl:p-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto w-full pb-10">
            {children}
          </div>
          
          {/* Footer - Integrated into scroll view */}
          <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 pb-8 px-4 xl:px-0">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-semibold text-slate-400">FootprintX</span>
              <span>© 2025 Open Source Initiative</span>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/VectrionX" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1"><Github className="w-3 h-3" /> GitHub</a>
              <a href="https://www.linkedin.com/in/mag99/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1"><Linkedin className="w-3 h-3" /> LinkedIn</a>
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
};

export default Layout;
