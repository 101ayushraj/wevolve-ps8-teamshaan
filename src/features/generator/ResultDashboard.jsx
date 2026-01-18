import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Button } from '../../components/ui/Button'; // Assuming you have this
import { Download, Copy, TrendingUp, ShieldCheck, ArrowLeft, Edit3, Sparkles, Check } from 'lucide-react';

export const ResultDashboard = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('variationA');
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(data.variationA);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEditableText(data[tab]);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!data) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

      {/* Top Nav: Back Button & High-Level Metrics */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <div className="p-2 rounded-full bg-slate-800 border border-slate-700 group-hover:border-blue-500/50 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium">Create New Position</span>
        </button>

        <div className="flex gap-4">
           {/* Metric Badges with Glass/Glow */}
           <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
             <TrendingUp size={14}/> {data.estimatedSalary}
           </div>
           <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
             <Sparkles size={14}/> {data.readabilityScore}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: Main Editor (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Tabs: Deep Dark Style */}
          <div className="flex bg-black/40 p-1.5 rounded-xl self-start border border-white/5 backdrop-blur-md">
            <button
              onClick={() => handleTabChange('variationA')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'variationA' ? 'bg-slate-800 text-white shadow-lg border border-slate-600/50' : 'text-slate-400 hover:text-white'}`}
            >
              Variation A: Professional
            </button>
            <button
              onClick={() => handleTabChange('variationB')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'variationB' ? 'bg-slate-800 text-white shadow-lg border border-slate-600/50' : 'text-slate-400 hover:text-white'}`}
            >
              Variation B: Startup Vibe
            </button>
          </div>

          {/* Main Glass Card Container */}
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl overflow-hidden group">

            {/* Floating Action Bar (Visible on Hover) */}
            <div className="absolute top-6 right-6 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <button onClick={() => setIsEditing(!isEditing)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-600/50 transition-colors">
                 <Edit3 size={16}/>
               </button>
               <button onClick={handleCopy} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-600/50 transition-colors">
                 {copied ? <Check size={16} className="text-emerald-400"/> : <Copy size={16}/>}
               </button>
            </div>

            {isEditing ? (
              <textarea
                className="w-full h-[600px] bg-black/20 text-slate-200 font-mono text-sm outline-none resize-none p-8 leading-relaxed rounded-xl focus:bg-black/40 transition-colors"
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
              />
            ) : (
              <div className="h-[600px] overflow-y-auto p-8 pr-4 custom-scrollbar">
                {/* Markdown Styling Overrides:
                   - H3: Gradient Text + Border
                   - Strong: Subtle Box Highlight
                   - P: Relaxed Line Height
                */}
                <Markdown options={{
                  overrides: {
                    h3: {
                      component: ({ children }) => (
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mt-8 mb-4 border-b border-slate-800 pb-2">
                          {children}
                        </h3>
                      ),
                    },
                    strong: {
                      component: ({ children }) => (
                        <strong className="text-white font-bold bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                          {children}
                        </strong>
                      ),
                    },
                    ul: {
                      component: ({ children }) => <ul className="list-disc pl-5 space-y-3 text-slate-300 mb-6">{children}</ul>
                    },
                    li: {
                      component: ({ children }) => <li className="pl-2">{children}</li>
                    },
                    p: {
                      component: ({ children }) => <p className="text-slate-400 leading-7 mb-4 text-[15px]">{children}</p>
                    },
                  },
                }}>
                  {editableText}
                </Markdown>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Insights & Actions (Span 4) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Diversity Score Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500"></div>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-white tracking-wide text-sm uppercase">Inclusivity Score</h3>
            </div>

            <div className="flex items-end justify-between mb-3">
              <span className="text-6xl font-extrabold text-white tracking-tighter">{data.diversityScore}</span>
              <span className="text-slate-500 mb-2 font-medium">/ 100</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mb-5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                style={{ width: `${data.diversityScore}%` }}
              ></div>
            </div>

            <p className="text-xs text-slate-400 italic bg-black/20 p-4 rounded-xl border border-white/5 leading-relaxed">
              "{data.diversityNotes}"
            </p>
          </div>

          {/* SEO Keywords Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
             <h3 className="font-bold text-slate-200 mb-4 text-sm uppercase tracking-wider">
               ATS Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.seoKeywords.map((kw, i) => (
                <span key={i} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-default">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
             <Download size={18} /> Export as PDF
          </button>

        </div>
      </div>
    </div>
  );
};