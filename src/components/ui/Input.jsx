import React from 'react';

export const Input = ({ label, type = "text", placeholder, value, onChange }) => (
  <div className="flex flex-col gap-2 mb-4">
    {label && <label className="text-slate-400 text-sm font-medium">{label}</label>}
    <input
      type={type}
      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);