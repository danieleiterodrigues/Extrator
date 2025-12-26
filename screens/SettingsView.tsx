
import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SettingsView: React.FC = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="mx-auto max-w-[800px] flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Ajustes do Sistema</h1>
        <p className="text-muted-light dark:text-muted-dark text-sm font-medium">Configure as preferências globais do Extrator e conectividade com a IA.</p>
      </div>

      <div className="grid gap-6">
        <Card header={<h3 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Aparência e Interface</h3>}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Modo Escuro (Dark Mode)</p>
              <p className="text-xs text-muted-light dark:text-muted-dark font-medium">Alternar entre tema claro e escuro para melhor conforto visual.</p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleDarkMode}>
              <span className="material-symbols-outlined mr-2">contrast</span>
              Alternar Tema
            </Button>
          </div>
        </Card>

        <Card header={<h3 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Motor de Inteligência Artificial</h3>}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-dark">Provedor de IA</label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">robot_2</span>
                <span className="text-sm font-bold">Google Gemini (Flash-latest)</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-dark">Sensibilidade de Validação</label>
              <input type="range" className="w-full accent-primary" min="0" max="100" defaultValue="85" />
              <div className="flex justify-between text-[10px] text-muted-dark font-bold">
                <span>PERMISSIVO</span>
                <span>CRÍTICO (85%)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card header={<h3 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Escrita em Banco de Dados</h3>}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <span className="material-symbols-outlined text-success">database</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Persistência SQLite Local</p>
                <p className="text-[10px] text-success font-bold uppercase">Status: Conectado e Otimizado</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-danger font-bold">REINICIAR DATABASE</Button>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 border-t border-border-light dark:border-border-dark pt-6">
        <Button variant="ghost">Descartar</Button>
        <Button variant="primary" className="px-8 shadow-lg shadow-primary/20">SALVAR ALTERAÇÕES</Button>
      </div>
    </div>
  );
};

export default SettingsView;
