import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { SkillSelector } from '../../components/business/SkillSelector';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

// --- INTERNAL DESIGN SYSTEM COMPONENTS ---
// These ensure the specific "Deep Space" look without affecting global UI files

const ModernInput = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1">{label}</label>
    <input
      className="bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none backdrop-blur-sm"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const ModernSelect = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
      <select
        className="w-full bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
        value={value}
        onChange={onChange}
      >
        {options.map(opt => <option key={opt} value={opt} className="bg-slate-900">{opt}</option>)}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
    </div>
  </div>
);

const INDUSTRIES = [
  "Fintech", "HealthTech", "E-Commerce", "SaaS / B2B", "EdTech",
  "Artificial Intelligence", "Cybersecurity", "Gaming", "Logistics", "GreenTech"
];

const CULTURES = [
  "Remote-First (Async & Flexible)",
  "Fast-Paced Startup (Hustle & Growth)",
  "Corporate (Structured & Stable)",
  "Innovation Lab (R&D Focused)",
  "Balanced (Hybrid & Wellness Focused)"
];

export const JobForm = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '', company: '', industry: 'Fintech', experience: 'Mid-Level',
    culture: 'Remote-First (Async & Flexible)', requirements: '', skills: []
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="w-full max-w-3xl relative mx-auto mt-8">

      {/* 1. The Ambient Glow Behind the Card */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur opacity-20 pointer-events-none"></div>

      {/* 2. The Glassmorphism Container */}
      <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">

        {/* Progress Bar Header */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {step === 1 && "Role Details"}
                {step === 2 && "Skills & Expertise"}
                {step === 3 && "Culture & Vibe"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {step === 1 && "Let's define the core position."}
                {step === 2 && "What tech stack is required?"}
                {step === 3 && "Set the tone and expectations."}
              </p>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
              Step {step}/3
            </span>
          </div>

          {/* Animated Gradient Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[350px]">

          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput
                  label="Job Title"
                  placeholder="e.g. Senior Backend Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <ModernInput
                  label="Company Name"
                  placeholder="e.g. Wevolve AI"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernSelect
                  label="Industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  options={INDUSTRIES}
                />
                <ModernSelect
                  label="Experience Level"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  options={["Entry Level (0-2 yrs)", "Mid-Level (2-5 yrs)", "Senior (5-8 yrs)", "Lead / Principal (8+ yrs)"]}
                />
              </div>

              <div className="pt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!formData.title || !formData.company}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/20 px-8 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                >
                  Next Step <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Skills */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <SkillSelector
                  selectedSkills={formData.skills}
                  setSelectedSkills={(skills) => setFormData({...formData, skills})}
                />
              </div>

              <div className="flex justify-between pt-8 border-t border-white/5 mt-4">
                <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-white">Back</Button>
                <Button
                  onClick={handleNext}
                  disabled={formData.skills.length === 0}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/20 px-8 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                >
                  Next Step <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Culture */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-1 gap-6">
                <ModernSelect
                  label="Company Culture"
                  value={formData.culture}
                  onChange={(e) => setFormData({...formData, culture: e.target.value})}
                  options={CULTURES}
                />

                <div className="flex flex-col gap-2">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1">Special Requirements (Optional)</label>
                  <textarea
                    className="bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none min-h-[120px] backdrop-blur-sm transition-all"
                    placeholder="e.g. Must be located in PST timezone, or requires 25% travel..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-8 border-t border-white/5 mt-4">
                <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-white">Back</Button>
                <Button
                  onClick={() => onSubmit(formData)}
                  disabled={isLoading}
                  className="w-48 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10 px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  {isLoading ? <Sparkles className="animate-spin" size={18}/> : <Sparkles size={18}/>}
                  {isLoading ? "Generating..." : "Generate Magic"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};