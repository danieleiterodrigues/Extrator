
import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../services/dataService';
import { AccidentRecord } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const DashboardView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [sortOrder, setSortOrder] = useState<'recent' | 'alpha'>('recent');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [records, setRecords] = useState<AccidentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await dataService.getDashboardRecords();
      setRecords(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Lógica de filtragem e ordenação combinada
  const filteredRecords = useMemo(() => {
    let result = records.filter(record => {
      const matchesSearch = 
        record.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.documento.includes(searchTerm) ||
        record.motivo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || record.status === statusFilter;
      const matchesCategory = categoryFilter === 'Todas' || record.motivo === categoryFilter;
      
      // Filtro de data simplificado (considerando que record.data é string "YYYY-MM-DD HH:mm")
      let matchesDate = true;
      if (dateStart) {
        matchesDate = matchesDate && record.data >= dateStart;
      }
      if (dateEnd) {
        matchesDate = matchesDate && record.data.split(' ')[0] <= dateEnd;
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });

    // Ordenação
    result.sort((a, b) => {
      if (sortOrder === 'recent') {
        return b.data.localeCompare(a.data);
      } else {
        return a.nome.localeCompare(b.nome);
      }
    });

    return result;
  }, [records, searchTerm, statusFilter, categoryFilter, sortOrder, dateStart, dateEnd]);

  // Extrair categorias únicas para o filtro
  const categories = useMemo(() => {
    const cats = records.map(r => r.motivo);
    return ['Todas', ...Array.from(new Set(cats))];
  }, [records]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('Todos');
    setCategoryFilter('Todas');
    setSortOrder('recent');
    setDateStart('');
    setDateEnd('');
  };

  return (
    <div className="mx-auto flex h-full max-w-[1400px] flex-col gap-6">
      {/* Search and Main Filters */}
      <Card noPadding className="z-20">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-end justify-between gap-4 p-4">
            <div className="flex flex-1 flex-wrap items-end gap-3">
              <div className="flex min-w-[280px] flex-1 flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark" htmlFor="search">Busca Global</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute inset-y-0 left-3 flex items-center text-slate-400 text-[20px]">search</span>
                  <input
                    className="block w-full rounded-md border-0 bg-slate-100 dark:bg-slate-900/50 py-2 pl-10 pr-3 text-sm text-slate-900 dark:text-white ring-1 ring-inset ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary outline-none transition-all"
                    id="search"
                    placeholder="Nome, documento ou motivo..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 w-44">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark">Status IA</label>
                <select 
                  className="block w-full rounded-md border-0 bg-slate-100 dark:bg-slate-900/50 py-2 pl-3 pr-10 text-sm dark:text-white ring-1 ring-inset ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Todos">Todos os Status</option>
                  <option value="Válido">Válidos</option>
                  <option value="Atenção">Atenção</option>
                  <option value="Inválido">Inválidos</option>
                </select>
              </div>

              <Button 
                variant={showAdvanced ? "secondary" : "outline"} 
                size="md"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={showAdvanced ? "bg-primary/10 text-primary border-primary/20" : ""}
              >
                <span className="material-symbols-outlined text-[18px] mr-2">
                  {showAdvanced ? 'expand_less' : 'filter_list'}
                </span>
                {showAdvanced ? "Fechar Filtros" : "Mais Filtros"}
              </Button>
            </div>

            <div className="flex items-center gap-3 border-l border-border-light dark:border-border-dark pl-4">
              <Button variant="ghost" size="icon" onClick={resetFilters} title="Limpar Filtros">
                <span className="material-symbols-outlined text-slate-400">filter_alt_off</span>
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvanced && (
            <div className="border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-900/20 p-4 animate-in slide-in-from-top duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark">Categoria de Acidente</label>
                  <select 
                    className="block w-full rounded-md border-0 bg-white dark:bg-background-dark py-2 px-3 text-sm dark:text-white ring-1 ring-inset ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary outline-none appearance-none"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark">Intervalo de Data</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="date" 
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                      className="flex-1 rounded-md border-0 bg-white dark:bg-background-dark py-1.5 px-2 text-xs dark:text-white ring-1 ring-inset ring-border-light dark:ring-border-dark outline-none" 
                    />
                    <span className="text-muted-dark text-xs">até</span>
                    <input 
                      type="date" 
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                      className="flex-1 rounded-md border-0 bg-white dark:bg-background-dark py-1.5 px-2 text-xs dark:text-white ring-1 ring-inset ring-border-light dark:ring-border-dark outline-none" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark">Ordenação</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={sortOrder === 'recent' ? 'primary' : 'outline'} 
                      size="sm" 
                      className="flex-1 text-[10px] py-1"
                      onClick={() => setSortOrder('recent')}
                    >
                      Mais Recentes
                    </Button>
                    <Button 
                      variant={sortOrder === 'alpha' ? 'primary' : 'outline'} 
                      size="sm" 
                      className="flex-1 text-[10px] py-1"
                      onClick={() => setSortOrder('alpha')}
                    >
                      Alfabética
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Main Table Container */}
      <Card noPadding className="flex-1 overflow-hidden flex flex-col min-h-[400px] shadow-ui-lg">
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <span className="material-symbols-outlined animate-spin text-primary text-5xl">progress_activity</span>
              <p className="text-xs font-bold text-muted-dark uppercase tracking-widest">Acessando banco de dados SQLite...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400 text-3xl">search_off</span>
              </div>
              <div className="text-center">
                <p className="text-slate-900 dark:text-white font-bold">Nenhum registro encontrado</p>
                <p className="text-muted-light dark:text-muted-dark text-sm">Tente ajustar seus filtros ou termos de busca.</p>
              </div>
              <Button variant="outline" size="sm" onClick={resetFilters}>Limpar Filtros</Button>
            </div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10 border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-widest" scope="col">Nome Completo</th>
                  <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-widest" scope="col">Documento</th>
                  <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-widest" scope="col">Motivo do Acidente</th>
                  <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-widest text-center" scope="col">Status IA</th>
                  <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-widest text-right" scope="col">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    className={`group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${
                      record.status === 'Inválido' ? 'bg-danger/5' : record.status === 'Atenção' ? 'bg-warning/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white">{record.nome}</span>
                        <span className="text-[10px] text-muted-light dark:text-muted-dark font-medium">Cadastrado em {record.data}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{record.documento}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{record.motivo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Badge 
                          variant={record.status === 'Válido' ? 'success' : record.status === 'Atenção' ? 'warning' : 'danger'} 
                          dot
                          className={record.status === 'Atenção' ? 'animate-pulse' : ''}
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {record.status !== 'Válido' ? (
                          <Button 
                            variant={record.status === 'Inválido' ? 'danger' : 'outline'} 
                            size="sm" 
                            className="h-8 text-[10px] px-3 font-bold uppercase tracking-tight"
                          >
                            {record.status === 'Inválido' ? 'Corrigir' : 'Revisar'}
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Footer / Pagination */}
        <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark px-6 py-4 bg-slate-50/50 dark:bg-slate-900/10">
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-light dark:text-muted-dark font-medium">
              Exibindo <span className="font-bold text-slate-900 dark:text-white">{filteredRecords.length}</span> de <span className="text-slate-400">{records.length}</span> registros
            </p>
            {(filteredRecords.length !== records.length || sortOrder !== 'recent') && (
              <Badge variant="outline" className="lowercase normal-case tracking-normal py-0">filtros ou ordenação ativos</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="px-2" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </Button>
            <div className="flex items-center gap-1">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-[11px] font-bold text-white shadow-sm shadow-primary/20">1</span>
            </div>
            <Button variant="outline" size="sm" className="px-2" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;
