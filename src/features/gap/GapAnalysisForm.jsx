import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SkillSelector } from '../../components/business/SkillSelector';

// Mock Target Roles
const TARGET_ROLES = [
  "Senior Full Stack Developer",
  "Senior React Developer",
  "Data Scientist",
  "DevOps Engineer"
];

export const GapAnalysisForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    current_role: '',
    experience_years: 1,
    target_role: 'Senior Full Stack Developer',
    current_skills: []
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Connects to your Python Backend
      const response = await fetch('https://wevolve-backend-bsol.onrender.com/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate: {
            current_role: formData.current_role,
            current_skills: formData.current_skills,
            experience_years: parseInt(formData.experience_years)
          },
          target_role: formData.target_role
        })
      });

      if (!response.ok) throw new Error("Backend not connected");

      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      alert("Error: Make sure your Python backend is running on port 8000!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Career Gap Analysis</h2>
        <p className="text-slate-400">Compare your current skills against industry standards.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Current Role</label>
            <input
              className="bg-black/20 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
              placeholder="e.g. Junior Developer"
              value={formData.current_role}
              onChange={e => setFormData({...formData, current_role: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Target Role</label>
            <select
              className="bg-black/20 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
              value={formData.target_role}
              onChange={e => setFormData({...formData, target_role: e.target.value})}
            >
              {TARGET_ROLES.map(r => <option key={r} value={r} className="bg-slate-900">{r}</option>)}
            </select>
          </div>
        </div>

        <div>
           <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Your Current Skills</label>
           <SkillSelector
             selectedSkills={formData.current_skills}
             setSelectedSkills={(s) => setFormData({...formData, current_skills: s})}
           />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || formData.current_skills.length === 0}
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
        >
          {loading ? <Sparkles className="animate-spin"/> : <Sparkles/>}
          {loading ? "Analyzing Profile..." : "Analyze My Gap"}
        </button>
      </div>
    </div>
  );
};