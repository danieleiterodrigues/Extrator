
import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const ResultsView: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, resultsData] = await Promise.all([
        dataService.getAnalysisStats(),
        dataService.getAnalysisResults()
      ]);
      setStats(statsData);
      setResults(resultsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Resultados da Análise</h2>
            <Badge variant="success">Análise Concluída</Badge>
          </div>
          <p className="text-sm text-muted-light dark:text-muted-dark font-medium">Lote #2023-10-24-A • Processamento local via Motor</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="md">
            <span className="material-symbols-outlined text-[20px] mr-2">data_object</span>
            JSON
          </Button>
          <Button variant="primary" size="md" className="shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[20px] mr-2">ios_share</span>
            Exportar Relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="group hover:border-primary/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold text-muted-light dark:text-muted-dark uppercase tracking-widest">{stat.label}</span>
              <span className={`material-symbols-outlined text-${stat.color}`}>{stat.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{stat.value}</span>
              {stat.sub && (
                <Badge variant={stat.color as any} className="px-1.5 py-0">
                  {stat.sub}
                </Badge>
              )}
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
              <div className={`bg-${stat.color} h-full`} style={{ width: stat.sub || '100%' }}></div>
            </div>
          </Card>
        ))}
      </div>

      <Card noPadding className="overflow-hidden flex flex-col shadow-ui-lg">
        <div className="p-4 border-b border-border-light dark:border-border-dark flex flex-wrap gap-4 items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
              placeholder="Buscar nos resultados..." 
              type="text"
            />
          </div>
          <div className="text-[10px] text-muted-light dark:text-muted-dark font-bold uppercase tracking-tighter">
            Exibindo <span className="text-slate-900 dark:text-white">{results.length}</span> registros de <span className="text-slate-900 dark:text-white">14.502</span>
          </div>
        </div>
        
        <div className="overflow-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-[10px] text-muted-light dark:text-muted-dark uppercase bg-slate-50 dark:bg-slate-900/50 font-bold border-b border-border-light dark:border-border-dark">
              <tr>
                <th className="px-6 py-4 tracking-widest">ID / Timestamp</th>
                <th className="px-6 py-4 tracking-widest">Classificação IA</th>
                <th className="px-6 py-4 tracking-widest">Justificativa Semântica</th>
                <th className="px-6 py-4 tracking-widest text-center">Score Confiança</th>
                <th className="px-6 py-4 tracking-widest text-center">Status Final</th>
                <th className="px-6 py-4 tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {results.map((item, i) => (
                <tr key={i} className={`group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${item.highlight ? `border-l-4 border-l-${item.highlight}` : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">{item.id}</span>
                      <span className="text-[10px] text-muted-light dark:text-muted-dark font-medium">{item.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="info">{item.type}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 max-w-xs font-medium leading-relaxed">
                      {item.justification}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <span className="text-xs font-bold text-slate-700 dark:text-white font-mono">{item.score}%</span>
                      <div className="w-16 h-1 bg-slate-200 dark:bg-slate-800 rounded-full">
                        <div 
                          className={`h-1 rounded-full ${item.score > 90 ? 'bg-success' : item.score > 50 ? 'bg-warning' : 'bg-danger'}`} 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge 
                      variant={item.status === 'Válido' ? 'success' : item.status === 'Atenção' ? 'warning' : 'danger'} 
                      dot
                      className={item.status === 'Atenção' ? 'animate-pulse' : ''}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon">
                      <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary">more_vert</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="bg-gradient-to-r from-slate-900 to-primary rounded-lg p-6 text-white flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden shadow-ui-lg border border-white/5">
        <div className="z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-warning">lightbulb</span>
            <h3 className="text-lg font-bold">Insight Adaptativo</h3>
          </div>
          <p className="text-indigo-100/80 text-sm max-w-xl font-medium">
            O Motor detectou uma melhoria de <span className="text-white font-bold">4.2%</span> na precisão do tipo "Capotamento" após suas últimas validações manuais.
          </p>
        </div>
        <div className="mt-4 md:mt-0 z-10">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
            Ver Relatório de Aprendizado
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
