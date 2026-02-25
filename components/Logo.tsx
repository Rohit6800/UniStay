
import React from 'react';
import { Home, GraduationCap } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, light = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className={`w-10 h-10 ${light ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'} rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50 transform transition-transform hover:scale-105 active:scale-95`}>
          <Home size={22} strokeWidth={2.5} />
          <div className={`absolute -top-1 -right-1 w-5 h-5 ${light ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} rounded-lg flex items-center justify-center shadow-md border-2 ${light ? 'border-white' : 'border-indigo-600'}`}>
            <GraduationCap size={12} strokeWidth={3} />
          </div>
        </div>
      </div>
      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={`text-2xl font-black tracking-tighter ${light ? 'text-white' : 'text-slate-900'}`}>
            Uni<span className={light ? 'text-indigo-200' : 'text-indigo-600'}>Stay</span>
          </span>
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${light ? 'text-indigo-100/70' : 'text-slate-400'}`}>
            Student Housing
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
