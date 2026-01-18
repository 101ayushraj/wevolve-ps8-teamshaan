import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { SKILL_DB } from '../../data/skillsDb';

export const SkillSelector = ({ selectedSkills, setSelectedSkills }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // LOGIC: Filter the DB based on input (Standard Search Algorithm)
  const filteredSkills = SKILL_DB.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSkills.includes(skill.name) // Don't show if already selected
  ).slice(0, 5); // Limit to top 5 results

  const addSkill = (skillName) => {
    setSelectedSkills([...selectedSkills, skillName]);
    setSearchTerm("");
    setIsOpen(false);
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="mb-6 relative">
      <label className="text-slate-400 text-sm font-medium mb-2 block">Required Skills</label>

      {/* 1. The Selected Tags Area */}
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedSkills.map(skill => (
          <span key={skill} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {skill}
            <button onClick={() => removeSkill(skill)} className="hover:text-blue-300">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* 2. The Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
        <input
          type="text"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type to search skills (e.g. React)..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        {/* 3. The Dropdown Menu */}
        {isOpen && searchTerm && filteredSkills.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
            {filteredSkills.map((skill, index) => (
              <button
                key={index}
                onClick={() => addSkill(skill.name)}
                className="w-full text-left px-4 py-3 hover:bg-slate-700 flex justify-between items-center group transition-colors"
              >
                <span className="font-medium text-slate-200">{skill.name}</span>
                <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded group-hover:bg-slate-800 transition-colors">
                  {skill.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
