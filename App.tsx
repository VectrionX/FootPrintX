
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Disclaimer from './components/Disclaimer';
import DorkSection from './components/DorkSection';
import InitialDisclaimerPopup from './components/InitialDisclaimerPopup';
import { ViewState } from './types';
import { generateInstaDorks, generatePersonDorks, generateXDorks, generateLinkedInDorks, generateEmailDorks } from './services/dorkEngine';
import { Instagram, User, Shield, Code, RefreshCcw, Info, Twitter, Linkedin, Mail, AlertCircle, CheckCircle2, ArrowRight, ExternalLink, Github, Scale, MessageSquare, Activity, Globe, Zap, Search } from 'lucide-react';

const App: React.FC = () => {
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [view, setView] = useState<ViewState>('HOME');
  
  // Form States
  const [instaUser, setInstaUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [xUser, setXUser] = useState('');
  const [liName, setLiName] = useState('');
  const [liCompany, setLiCompany] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [options, setOptions] = useState({ variations: true, transliterate: false });

  // Validation Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleRegex = /^[a-zA-Z0-9._]{1,30}$/; // Standard for IG/X
  const nameRegex = /^[a-zA-Z\s-']{2,50}$/;

  // Computed Validation State
  const validation = useMemo(() => ({
    insta: {
      valid: handleRegex.test(instaUser.trim()),
      dirty: instaUser.trim().length > 0
    },
    x: {
      valid: handleRegex.test(xUser.trim()),
      dirty: xUser.trim().length > 0
    },
    linkedin: {
      valid: nameRegex.test(liName.trim()),
      dirty: liName.trim().length > 0
    },
    email: {
      valid: emailRegex.test(emailAddress.trim()),
      dirty: emailAddress.trim().length > 0
    },
    person: {
      firstValid: nameRegex.test(firstName.trim()),
      lastValid: nameRegex.test(lastName.trim()),
      dirty: firstName.trim().length > 0 || lastName.trim().length > 0
    }
  }), [instaUser, xUser, liName, emailAddress, firstName, lastName]);

  // Memoized Categories - Only generate if validation passes
  const instaCategories = useMemo(() => validation.insta.valid ? generateInstaDorks(instaUser) : [], [instaUser, validation.insta.valid]);
  const personCategories = useMemo(() => (validation.person.firstValid && validation.person.lastValid) ? generatePersonDorks(firstName, lastName, options) : [], [firstName, lastName, options, validation.person.firstValid, validation.person.lastValid]);
  const xCategories = useMemo(() => validation.x.valid ? generateXDorks(xUser) : [], [xUser, validation.x.valid]);
  const liCategories = useMemo(() => validation.linkedin.valid ? generateLinkedInDorks(liName, liCompany) : [], [liName, liCompany, validation.linkedin.valid]);
  const emailCategories = useMemo(() => validation.email.valid ? generateEmailDorks(emailAddress) : [], [emailAddress, validation.email.valid]);

  const renderHome = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/20">v1.0.0 Stable</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
               Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">FootprintX</span>
             </h1>
             <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
               Advanced passive intelligence gathering. Generate surgical search engine queries without touching target infrastructure.
             </p>
          </div>
        </div>

        {/* Quick Stats / Status Card */}
        <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-semibold">System Status</h3>
               <Activity className="text-emerald-500 w-5 h-5" />
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Modules Active</span>
                 <span className="text-white font-mono">5/5</span>
               </div>
               <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-emerald-500 h-full w-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400">Privacy Mode</span>
                 <span className="text-emerald-400 font-bold text-xs uppercase">Enforced</span>
               </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <Shield className="w-3 h-3" />
               Client-side processing only
             </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <h2 className="text-xl font-bold text-white">Intelligence Modules</h2>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard 
           title="Instagram" 
           subtitle="Profile & Tagged" 
           icon={<Instagram className="w-6 h-6 text-pink-500" />} 
           onClick={() => setView('INSTA')} 
           color="hover:border-pink-500/50" 
           stats="9 Categories"
        />
        <DashboardCard 
           title="X (Twitter)" 
           subtitle="Interactions" 
           icon={<Twitter className="w-6 h-6 text-sky-500" />} 
           onClick={() => setView('X')} 
           color="hover:border-sky-500/50" 
           stats="7 Categories"
        />
        <DashboardCard 
           title="LinkedIn" 
           subtitle="Professional" 
           icon={<Linkedin className="w-6 h-6 text-blue-600" />} 
           onClick={() => setView('LINKEDIN')} 
           color="hover:border-blue-600/50" 
           stats="3 Categories"
        />
        <DashboardCard 
           title="Email OSINT" 
           subtitle="Breach & Pivots" 
           icon={<Mail className="w-6 h-6 text-emerald-500" />} 
           onClick={() => setView('EMAIL')} 
           color="hover:border-emerald-500/50" 
           stats="3 Categories"
        />
        <DashboardCard 
           title="Person Search" 
           subtitle="Identity & Docs" 
           icon={<User className="w-6 h-6 text-indigo-400" />} 
           onClick={() => setView('PERSON')} 
           color="hover:border-indigo-400/50" 
           stats="5 Categories"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 pt-4">
         <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <Zap className="w-5 h-5 text-yellow-500" /> Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <TipCard title="100% Passive" desc="Pure dork generation. No API calls or logins required." />
               <TipCard title="Engine Optimized" desc="Queries tuned for Google, Bing, and Yandex syntax." />
               <TipCard title="Zero Logging" desc="Your data never leaves your browser memory." />
            </div>
         </div>
      </div>
    </div>
  );

  const renderX = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-500/10 transition-colors duration-1000"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
             <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-4 border border-sky-500/20">
               <Twitter className="w-8 h-8 text-sky-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">X Intelligence</h2>
             <p className="text-slate-400 text-sm leading-relaxed">
               Target interaction history, cached tweets, and cross-platform mentions for X (formerly Twitter).
             </p>
          </div>

          <div className="lg:col-span-2 bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Target Username</label>
            <div className="relative group/input">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-lg group-focus-within/input:text-sky-500 transition-colors">@</span>
              <input 
                type="text" 
                value={xUser}
                onChange={(e) => setXUser(e.target.value.replace('@', ''))}
                placeholder="username"
                className={`w-full bg-[#1F2937] border ${validation.x.dirty && !validation.x.valid ? 'border-red-500' : validation.x.valid ? 'border-sky-500/50' : 'border-white/5'} rounded-xl py-4 pl-10 pr-12 text-white font-mono placeholder:text-slate-600 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none transition-all`}
              />
              {validation.x.valid && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
              )}
            </div>
            {validation.x.dirty && !validation.x.valid && (
              <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Usernames must be 1-30 chars (alphanumeric & underscore).
              </p>
            )}
          </div>
        </div>
      </div>

      {xCategories.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {xCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
        </div>
      )}
    </div>
  );

  const renderLinkedIn = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors duration-1000"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
             <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 border border-blue-600/20">
               <Linkedin className="w-8 h-8 text-blue-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Professional Recon</h2>
             <p className="text-slate-400 text-sm leading-relaxed">
               Locate professional profiles, employment history, resumes, and corporate associations.
             </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={liName}
                    onChange={(e) => setLiName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full bg-[#1F2937] border ${validation.linkedin.dirty && !validation.linkedin.valid ? 'border-red-500' : validation.linkedin.valid ? 'border-blue-500/50' : 'border-white/5'} rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Company (Opt)</label>
                  <input 
                    type="text" 
                    value={liCompany}
                    onChange={(e) => setLiCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full bg-[#1F2937] border border-white/5 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>
               {validation.linkedin.dirty && !validation.linkedin.valid && (
                  <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Enter a valid name (min 2 chars).
                  </p>
               )}
            </div>
          </div>
        </div>
      </div>
      
      {liCategories.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {liCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
        </div>
      )}
    </div>
  );

  const renderEmail = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors duration-1000"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
             <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
               <Mail className="w-8 h-8 text-emerald-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Email Footprint</h2>
             <p className="text-slate-400 text-sm leading-relaxed">
               Expose email presence, potential breaches, paste-site dumps, and associated profiles.
             </p>
          </div>

          <div className="lg:col-span-2 bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Target Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="target@example.com"
                className={`w-full bg-[#1F2937] border ${validation.email.dirty && !validation.email.valid ? 'border-red-500' : validation.email.valid ? 'border-emerald-500/50' : 'border-white/5'} rounded-xl py-4 px-4 text-white font-mono placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all`}
              />
              {validation.email.valid && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
              )}
            </div>
            {validation.email.dirty && !validation.email.valid && (
              <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Valid email format required (user@domain.com).
              </p>
            )}
          </div>
        </div>
      </div>
      
      {emailCategories.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {emailCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
        </div>
      )}
    </div>
  );

  const renderInsta = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/10 transition-colors duration-1000"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
             <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-4 border border-pink-500/20">
               <Instagram className="w-8 h-8 text-pink-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Instagram Recon</h2>
             <p className="text-slate-400 text-sm leading-relaxed">
               Locate profiles, tagged content, mirrors, and cross-platform mentions.
             </p>
          </div>

          <div className="lg:col-span-2 bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Instagram Username</label>
            <div className="relative group/input">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-lg group-focus-within/input:text-pink-500 transition-colors">@</span>
              <input 
                type="text" 
                value={instaUser}
                onChange={(e) => setInstaUser(e.target.value.replace('@', ''))}
                placeholder="username"
                className={`w-full bg-[#1F2937] border ${validation.insta.dirty && !validation.insta.valid ? 'border-red-500' : validation.insta.valid ? 'border-pink-500/50' : 'border-white/5'} rounded-xl py-4 pl-10 pr-12 text-white font-mono placeholder:text-slate-600 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 focus:outline-none transition-all`}
              />
              {validation.insta.valid && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
              )}
            </div>
            {validation.insta.dirty && !validation.insta.valid && (
              <p className="mt-3 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Usernames must be 1-30 chars.
              </p>
            )}
          </div>
        </div>
      </div>
      
      {instaCategories.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {instaCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
        </div>
      )}
    </div>
  );

  const renderPerson = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors duration-1000"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
             <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20">
               <User className="w-8 h-8 text-indigo-400" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">Person Lookup</h2>
             <p className="text-slate-400 text-sm leading-relaxed">
               Discover identity footprints, accounts, and docs using first and last names.
             </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
             <div className="bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className={`w-full bg-[#1F2937] border ${firstName.length > 0 && !validation.person.firstValid ? 'border-red-500' : validation.person.firstValid ? 'border-indigo-500/50' : 'border-white/5'} rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className={`w-full bg-[#1F2937] border ${lastName.length > 0 && !validation.person.lastValid ? 'border-red-500' : validation.person.lastValid ? 'border-indigo-500/50' : 'border-white/5'} rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all`}
                    />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${options.variations ? 'bg-indigo-500 border-indigo-500' : 'bg-transparent border-slate-600'}`}>
                       {options.variations && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      checked={options.variations}
                      onChange={(e) => setOptions({...options, variations: e.target.checked})}
                      className="hidden"
                    />
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Include name variations</span>
                  </label>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {personCategories.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {personCategories.map(cat => <DorkSection key={cat.id} category={cat} />)}
        </div>
      )}
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-10 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
           <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Info className="w-8 h-8 text-purple-400" />
           </div>
           <h1 className="text-3xl font-bold text-white">About FootprintX</h1>
        </div>
        
        <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed">
          <p className="text-lg">
            FootprintX is a professional-grade passive OSINT tool designed for the intelligence community. 
            It combines modular dork engines with a strict privacy-first architecture, ensuring all processing happens locally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
           <div className="bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                 <User className="w-4 h-4 text-blue-400" /> Maintainer
              </h3>
              <p className="text-xl font-bold text-white mb-1">Mohammad Ghanem</p>
              <p className="text-slate-500 text-sm mb-4">Security Researcher & Developer</p>
              <div className="flex gap-3">
                 <a href="https://github.com/VectrionX" target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#1F2937] hover:bg-white/10 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" /> GitHub
                 </a>
                 <a href="https://www.linkedin.com/in/mag99/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                 </a>
              </div>
           </div>
           <div className="bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
               <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                 <Code className="text-purple-400 w-4 h-4" /> Roadmap
               </h3>
               <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Username Correlation Engine</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div> Image Metadata Indexing</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div> Domain Pivot Mode</li>
               </ul>
           </div>
        </div>
        
        <div className="mt-10 p-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
           <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Usage Policy & Disclaimer
           </h3>
           <p className="text-slate-400 text-sm leading-relaxed">
              This tool generates search queries purely on the client side. No data is stored, and no actual requests are made to any target platforms by this application. Users are solely responsible for ensuring that their use of these search queries complies with all applicable laws, terms of service, and ethical guidelines. FootprintX is provided for educational and lawful security research only.
           </p>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <MessageSquare className="text-emerald-400 w-5 h-5" /> Feedback & Collaboration
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Have a suggestion for a new dork module? Found a bug? 
            We are always looking to improve FootprintX.
          </p>
          <a 
            href="https://www.linkedin.com/in/mag99/" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-all text-sm"
          >
            Contact via LinkedIn <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );



  return (
    <>
      {!hasAcceptedDisclaimer && (
        <InitialDisclaimerPopup 
          onAccept={() => {
            setHasAcceptedDisclaimer(true);
          }} 
        />
      )}
      <Layout currentView={view} setView={setView}>
        {view === 'HOME' && renderHome()}
        {view === 'INSTA' && renderInsta()}
        {view === 'X' && renderX()}
        {view === 'LINKEDIN' && renderLinkedIn()}
        {view === 'EMAIL' && renderEmail()}
        {view === 'PERSON' && renderPerson()}
        {view === 'ABOUT' && renderAbout()}
      </Layout>
    </>
  );
};

// Internal Helper Components for Dashboard
const DashboardCard: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; onClick: () => void; color: string; stats: string }> = ({ title, subtitle, icon, onClick, color, stats }) => (
  <button 
    onClick={onClick}
    className={`bg-[#111827] p-6 rounded-3xl border border-white/5 hover:border-opacity-50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl flex flex-col items-start w-full text-left ${color}`}
  >
    <div className="flex items-start justify-between w-full mb-4">
       <div className="p-3 bg-[#1F2937] rounded-2xl group-hover:bg-[#374151] transition-colors border border-white/5">
         {icon}
       </div>
       <div className="p-2 rounded-full bg-[#1F2937] group-hover:bg-white/10 transition-colors">
         <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
       </div>
    </div>
    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-sm text-slate-500 mb-4">{subtitle}</p>
    <div className="mt-auto w-full pt-4 border-t border-white/5 flex justify-between items-center">
       <span className="text-xs font-mono text-slate-400">{stats}</span>
       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
    </div>
  </button>
);

const TipCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5">
    <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
    <p className="text-xs text-slate-400 leading-snug">{desc}</p>
  </div>
);

export default App;
