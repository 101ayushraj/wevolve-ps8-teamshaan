import React, { useState } from 'react';
import { JobForm } from './features/generator/JobForm';
import { ResultDashboard } from './features/generator/ResultDashboard';
import { GapAnalysisForm } from './features/gap/GapAnalysisForm'; // New Component
import { GapResult } from './features/gap/GapResult'; // New Component
import { generateJobDescription } from './services/aiService';
import { ArrowRight, Play, BarChart3, ChevronLeft } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState('home'); // 'home', 'job-gen', 'gap-analysis'
  const [jobResult, setJobResult] = useState(null);
  const [gapResult, setGapResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ... (Keep your existing handleGenerate for Jobs) ...

  return (
    <div className="min-h-screen p-6 md:p-12 text-slate-200 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Background Ambient Glows */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] -z-10 rounded-full mix-blend-screen pointer-events-none opacity-50"></div>

        {/* --- HEADER / HERO SECTION --- */}
        {mode === 'home' && (
          <header className="text-center mt-20 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              AI-Powered Career Intelligence
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Wevolve <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400">Gen</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
              The all-in-one platform for the modern workforce.
              <span className="text-slate-200 font-medium ml-2">Generate JD's</span> for hiring or
              <span className="text-slate-200 font-medium ml-2">Analyze Skill Gaps</span> for growth.
            </p>

            {/* DUAL CTA BUTTONS */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
               {/* Button 1: Job Gen */}
               <button
                 onClick={() => setMode('job-gen')}
                 className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl text-white font-bold text-lg shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300"
               >
                 <Play size={18} fill="currentColor" />
                 Create Job Position
               </button>

               {/* Button 2: Gap Analysis (Outline Style) */}
               <button
                 onClick={() => setMode('gap-analysis')}
                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
               >
                 <BarChart3 size={18} />
                 Analyze Career Gap
               </button>
            </div>
          </header>
        )}

        {/* --- BACK BUTTON (For Sub-pages) --- */}
        {mode !== 'home' && (
          <button onClick={() => setMode('home')} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} /> Back to Home
          </button>
        )}

        {/* --- FEATURE 1: JOB GENERATOR --- */}
        {mode === 'job-gen' && !jobResult && (
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-12 duration-700">
             <JobForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
        )}
        {mode === 'job-gen' && jobResult && (
           <ResultDashboard data={jobResult} onReset={() => setJobResult(null)} />
        )}

        {/* --- FEATURE 2: GAP ANALYSIS (New) --- */}
        {mode === 'gap-analysis' && !gapResult && (
           <div className="flex justify-center animate-in fade-in slide-in-from-bottom-12 duration-700">
              <GapAnalysisForm onSuccess={setGapResult} />
           </div>
        )}
        {mode === 'gap-analysis' && gapResult && (
           <GapResult data={gapResult} onReset={() => setGapResult(null)} />
        )}

      </div>
    </div>
  );
}