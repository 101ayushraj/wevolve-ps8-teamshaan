import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
  CheckCircle2, XCircle, Clock, ArrowRight, BookOpen, Code, Layers, Zap, TrendingUp
} from 'lucide-react';

export const GapResult = ({ data }) => {

  const chartData = [
    { subject: 'Current Skills', A: data.match_score, fullMark: 100 },
    { subject: 'Market Demand', A: 90, fullMark: 100 },
    { subject: 'Experience', A: 60, fullMark: 100 },
    { subject: 'Readiness', A: data.match_score, fullMark: 100 },
    { subject: 'Potential', A: 85, fullMark: 100 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">

      {/* 1. HERO METRICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT: The Readiness Dial */}
        <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin-slow opacity-50"></div>

            <svg className="w-full h-full -rotate-90 transform group-hover:scale-105 transition-transform duration-500" viewBox="0 0 36 36">
              <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
              <path className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" strokeDasharray={`${data.match_score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center">
               <span className="text-5xl font-extrabold text-white tracking-tighter">{data.match_score}%</span>
               <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Ready</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-white font-bold text-lg">Market Readiness: <span className={data.match_score > 70 ? "text-emerald-400" : "text-amber-400"}>{data.readiness_level}</span></h3>
            <p className="text-slate-400 text-sm px-4">Based on current market requirements.</p>
          </div>
        </div>

        {/* MIDDLE: Skill Gap Radar */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20"><Layers size={18}/></div>
             <h3 className="font-bold text-white">Profile Analysis</h3>
          </div>

          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Candidate"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Quick Stats with Hover Reveal */}
        <div className="lg:col-span-3 flex flex-col gap-6">
           <div className="flex-1 bg-emerald-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex flex-col justify-center h-full transition-all duration-300 group-hover:opacity-10 group-hover:blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                     <CheckCircle2 className="text-emerald-400" size={24}/>
                     <span className="text-emerald-400 font-bold uppercase text-xs tracking-wider">Strong Matches</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{data.matching_skills.length} Skills</div>
                  <p className="text-slate-400 text-xs">You are ahead of the curve in these areas.</p>
              </div>
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle2 size={12}/> Verified Skills
                  </div>
                  <div className="flex flex-wrap gap-2 overflow-y-auto content-start custom-scrollbar h-full">
                    {data.matching_skills.length > 0 ? (
                      data.matching_skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 rounded text-[10px] font-medium whitespace-nowrap">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 text-xs italic">No exact matches yet.</span>
                    )}
                  </div>
              </div>
           </div>

           <div className="flex-1 bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex flex-col justify-center h-full transition-all duration-300 group-hover:opacity-10 group-hover:blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                     <Zap className="text-red-400" size={24}/>
                     <span className="text-red-400 font-bold uppercase text-xs tracking-wider">Critical Gaps</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{data.missing_skills.length} Skills</div>
                  <p className="text-slate-400 text-xs">Priority areas to focus your learning.</p>
              </div>
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap size={12}/> Missing Skills
                  </div>
                  <div className="flex flex-wrap gap-2 overflow-y-auto content-start custom-scrollbar h-full">
                    {data.missing_skills.length > 0 ? (
                      data.missing_skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-red-500/20 text-red-300 border border-red-500/20 rounded text-[10px] font-medium whitespace-nowrap">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 text-xs italic">You have every skill required!</span>
                    )}
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. SKILL STACK VISUALIZER */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
           <TrendingUp className="text-blue-400"/> Technical Stack Audit
         </h3>

         <div className="space-y-6">
            <div>
               <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Priority Learning Queue</div>
               <div className="flex flex-wrap gap-3">
                 {data.missing_skills.map((skill, i) => (
                   <div key={i} className="group relative pl-4 pr-3 py-2 bg-slate-800/50 hover:bg-slate-800 border-l-4 border-amber-500 rounded-r-lg flex items-center gap-3 transition-all cursor-default">
                      <span className="text-slate-200 font-medium text-sm">{skill}</span>
                      <span className="opacity-0 group-hover:opacity-100 text-amber-500 text-[10px] font-bold uppercase transition-opacity">Learn</span>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </div>

      {/* 3. INTERACTIVE ROADMAP (UPDATED: Bold Durations) */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex justify-between items-end mb-8 relative z-10">
           <div>
             <h3 className="text-2xl font-bold text-white flex items-center gap-2">
               <Clock className="text-blue-400"/> Strategic Roadmap
             </h3>
             <p className="text-slate-400 mt-1 text-sm">Your personalized path to the target role.</p>
           </div>

           {/* Total Time Badge */}
           <div className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-bold border border-blue-500/20 shadow-lg shadow-blue-900/20">
             Total Est. Time: {data.estimated_time}
           </div>
        </div>

        <div className="relative border-l-2 border-slate-700 ml-3 space-y-12">
          {data.roadmap.map((phase, idx) => (
            <div key={idx} className="relative pl-8 group">
              <span className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-slate-900 border-4 border-blue-500 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>

              {/* --- UPDATED HEADER SECTION --- */}
              <div className="mb-3 flex items-center gap-3 flex-wrap">
                 {/* Phase Badge */}
                 <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                    Phase {phase.phase}
                 </span>

                 {/* DURATION BADGE (BOLD & WHITE) */}
                 <span className="text-sm font-extrabold text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 shadow-sm flex items-center gap-2">
                    <Clock size={14} className="text-amber-400" />
                    {phase.duration}
                 </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">{phase.focus}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {phase.actions.map((action, actionIdx) => (
                    <div key={actionIdx} className="bg-black/20 hover:bg-black/40 border border-white/5 p-4 rounded-xl transition-all hover:border-blue-500/30 flex gap-4">
                       <div className="mt-1">
                          {action.type === 'project' && <Code size={20} className="text-pink-400"/>}
                          {action.type === 'course' && <BookOpen size={20} className="text-amber-400"/>}
                          {action.type === 'reading' && <Layers size={20} className="text-blue-400"/>}
                       </div>
                       <div>
                          <h5 className="text-slate-200 font-semibold text-sm mb-1">{action.title}</h5>
                          <p className="text-slate-400 text-xs leading-relaxed">{action.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};