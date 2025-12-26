
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex items-center justify-between px-6 shrink-0 z-20 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary border border-primary/20">
          <span className="material-symbols-outlined text-[24px]">analytics</span>
        </div>
        <div className="hidden sm:block">
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Extrator</h2>
          <p className="text-muted-light dark:text-muted-dark text-[10px] font-bold uppercase tracking-widest">v2.4.0 • Enterprise Edition</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-success/10 border border-success/20 px-3 py-1.5">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </div>
          <span className="text-success text-[9px] font-bold tracking-widest uppercase">Motor SQL Ativo</span>
        </div>
        
        <div className="h-8 w-px bg-border-light dark:bg-border-dark mx-1"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Admin User</p>
            <p className="text-[10px] text-muted-light dark:text-muted-dark font-bold uppercase">Analista Sênior</p>
          </div>
          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-sm font-bold border-2 border-surface-light dark:border-surface-dark text-white shadow-sm">
            AU
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
