import React from 'react';

const Preloader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500">
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 mb-4 flex items-center justify-center">
        <svg className="animate-spin-slow" width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="6" strokeDasharray="44 44" strokeLinecap="round" />
        </svg>
        <span className="absolute text-3xl font-bold text-blue-600 select-none">В</span>
      </div>
      <div className="text-xl font-semibold text-blue-700 tracking-wide animate-pulse">ВашДом</div>
    </div>
  </div>
);

export default Preloader; 