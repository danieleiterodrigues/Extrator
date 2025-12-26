
export type Screen = 'dashboard' | 'import' | 'results' | 'engine' | 'settings' | 'design-system';

export interface AccidentRecord {
  id: string;
  nome: string;
  documento: string;
  motivo: string;
  status: 'Válido' | 'Inválido' | 'Atenção';
  data: string;
  aiJustification?: string;
  aiScore?: number;
}

export interface ProcessingFile {
  id: string;
  name: string;
  size: string;
  status: 'validating' | 'ready' | 'error';
  addedAt: string;
  error?: string;
}

export interface EngineLog {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'AI-ENGINE' | 'ERROR' | 'WARNING';
  message: string;
}
