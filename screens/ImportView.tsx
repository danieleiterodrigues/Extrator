
import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { ProcessingFile } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const ImportView: React.FC = () => {
  const [files, setFiles] = useState<ProcessingFile[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getImportFiles();
      setFiles(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-[1024px] flex flex-col gap-8 pb-32">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Importação de Dados</h1>
          <Button variant="ghost" size="sm" className="text-primary font-bold">
            <span className="material-symbols-outlined text-[18px] mr-2">history</span>
            VER HISTÓRICO
          </Button>
        </div>
        <p className="text-muted-light dark:text-muted-dark text-sm max-w-2xl font-medium leading-relaxed">
          O sistema realiza a validação estrutural imediata e a limpeza de dados sensíveis antes de carregar para a base SQL local.
        </p>
      </div>

      <div className="group relative flex flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed border-border-light dark:border-border-dark bg-surface-light dark:bg-slate-900/30 px-6 py-16 transition-all hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer shadow-sm overflow-hidden">
        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 transition-colors border border-border-light dark:border-border-dark">
          <span className="material-symbols-outlined text-[40px] text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center z-10">
          <p className="text-slate-900 dark:text-white text-xl font-bold">Arraste e solte arquivos aqui</p>
          <p className="text-muted-light dark:text-muted-dark text-xs font-bold uppercase tracking-widest">Formatos aceitos: CSV, XLSX, GXL (Máx. 500MB)</p>
        </div>
        <Button variant="outline" className="z-10 shadow-sm border-slate-300 dark:border-slate-700">
          Explorar Arquivos Locais
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-slate-900 dark:text-white font-bold flex items-center gap-3 text-sm uppercase tracking-widest">
            Fila de Processamento
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">{files.length} Pendentes</span>
          </h3>
          <Button variant="ghost" size="sm" className="text-[10px] text-muted-dark hover:text-danger">Limpar Tudo</Button>
        </div>

        <Card noPadding className="overflow-hidden border-border-light dark:border-border-dark shadow-ui">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-border-light dark:border-border-dark">
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark w-[40%]">Arquivo Fonte</th>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark w-[15%]">Tamanho</th>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark w-[30%]">Status de Validação</th>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark w-[15%] text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {files.map(file => (
                <tr key={file.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                        file.status === 'error' 
                          ? 'bg-danger/10 border-danger/20 text-danger' 
                          : 'bg-primary/10 border-primary/20 text-primary'
                      }`}>
                        <span className="material-symbols-outlined text-[24px]">
                          {file.status === 'error' ? 'report' : 'description'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${file.status === 'error' ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                          {file.name}
                        </span>
                        <span className="text-[10px] text-muted-light dark:text-muted-dark font-bold uppercase tracking-tighter">Adicionado {file.addedAt}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs font-bold">{file.size}</td>
                  <td className="px-5 py-4">
                    <Badge 
                      variant={
                        file.status === 'validating' ? 'warning' : 
                        file.status === 'ready' ? 'success' : 'danger'
                      }
                      dot
                      className={file.status === 'validating' ? 'animate-pulse' : ''}
                    >
                      {file.status === 'validating' ? 'Validando Integridade' : 
                       file.status === 'ready' ? 'Pronto para Importar' : 'Erro na Estrutura'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="ghost" size="icon" className="hover:text-danger">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-900/30 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-dark">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">database</span>
              Volume Total: 58.0 MB
            </span>
            <span className="text-success">{files.filter(f => f.status === 'ready').length} de {files.length} arquivos prontos</span>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-16 lg:left-64 right-0 border-t border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md p-4 px-8 z-40 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)]">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between">
          <div className="hidden sm:flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            <p className="text-[10px] font-bold text-muted-light dark:text-muted-dark uppercase tracking-widest">Aguardando confirmação para escrita no SQLite</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Button variant="ghost" className="text-muted-light dark:text-muted-dark font-bold flex-1 sm:flex-none">
              Limpar Lista
            </Button>
            <Button variant="primary" className="shadow-lg shadow-primary/30 min-w-[220px] h-12 flex-1 sm:flex-none">
              <span className="material-symbols-outlined text-[22px] mr-2">database_upload</span>
              EFETIVAR IMPORTAÇÃO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportView;
