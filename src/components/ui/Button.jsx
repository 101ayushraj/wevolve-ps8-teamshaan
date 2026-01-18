import React from 'react';

export const Button = ({ children, onClick, variant = "primary", disabled = false, className = "" }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20 shadow-md",
    outline: "border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white bg-transparent",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-700/50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
