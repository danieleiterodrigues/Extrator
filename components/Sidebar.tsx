
import React from 'react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'import', label: 'Importação', icon: 'upload_file' },
    { id: 'results', label: 'Resultados', icon: 'assignment_turned_in' },
    { id: 'engine', label: 'Motor IA', icon: 'terminal' },
    { id: 'design-system', label: 'Design System', icon: 'palette' },
  ] as const;

  return (
    <aside className="w-16 lg:w-64 border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex flex-col shrink-0 transition-all duration-300 z-30">
      <nav className="flex-1 py-6 flex flex-col gap-1.5 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group ${
              currentScreen === item.id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-slate-500 dark:text-muted-dark hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${currentScreen === item.id ? 'filled' : ''}`}>
              {item.icon}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border-light dark:border-border-dark space-y-4">
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-3 hidden lg:block border border-border-light dark:border-border-dark/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-bold text-muted-light dark:text-muted-dark uppercase tracking-widest">Base Local</span>
            <span className="text-[10px] font-bold text-primary font-mono">75%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1">
            <div className="bg-primary h-1 rounded-full shadow-[0_0_8px_rgba(19,91,236,0.4)]" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        <button 
          onClick={() => onNavigate('settings')}
          className={`flex items-center justify-center gap-3 px-3 py-2 w-full rounded-md lg:justify-start transition-colors ${
            currentScreen === 'settings' 
              ? 'bg-primary/10 text-primary' 
              : 'text-slate-500 dark:text-muted-dark hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span className={`material-symbols-outlined text-[22px] ${currentScreen === 'settings' ? 'filled text-primary' : ''}`}>settings</span>
          <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">Ajustes</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
